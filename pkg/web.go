package web

import (
	"context"
	"fmt"
	"mime"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"

	"github.com/k0kubun/pp"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/rai-project/uuid"
	echologger "github.com/rai-project/web/logger"
)

func webRoutes(e *echo.Echo) error {
	e.GET("/routes", func(c echo.Context) error {
		return c.JSON(http.StatusOK, e.Routes())
	})
	return nil
}

func Start(addr string) {
	e := echo.New()

	e.Logger = &echologger.EchoLogger{
		Entry: log,
	}

	mime.AddExtensionType(".js", echo.MIMEApplicationJavaScriptCharsetUTF8)
	mime.AddExtensionType(".css", "text/css")

	e.Use(middleware.Recover())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Skipper: middleware.DefaultSkipper,
		Format:  middleware.DefaultLoggerConfig.Format,
		Output:  log.Writer(),
	}))
	e.Use(middleware.RequestIDWithConfig(middleware.RequestIDConfig{
		Generator: func() string {
			return uuid.NewV4()
		},
	}))
	//e.Use(AllowCrossOrigin())
	e.Use(AllowTracedHeaders())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"https://carml.org",
			"https://www.carml.org",
			"https://mlmodelscope.org",
			"https://www.mlmodelscope.org",
			"https://mlmodelscope.netlify.com",
		},
		AllowMethods:     []string{echo.GET, echo.PUT, echo.POST, echo.DELETE, echo.OPTIONS},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowCredentials: true,
	}))

	chain := []func(*echo.Echo) error{
		pprofRoutes,
		swaggerUIAssets,
		jaegerAssets,
		assetsRoutes,
		registryRoutes,
		apiRoutes,
		webRoutes,
	}
	for _, c := range chain {
		if err := c(e); err != nil {
			panic(err)
		}
	}

	fmt.Println("🌎  Webserver started at address", pprintAddr(addr))
	defer func() {
		fmt.Println("🌀  Webserver stopped.")
	}()
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in webserver runner", pp.Sprint(r))
		}
	}()

	// Start server
	go func() {
		// Setting up the termination timeout to 30 seconds.
		err := e.Start(addr)
		if err != nil {
			log.WithError(err).Fatal("✗ Failed to start web server")
			return
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 10 seconds.
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		log.WithError(err).Fatal("✗ Failed to gracefully shutdown server")
	}
}

// Used for pretty printing addresses.
func pprintAddr(addr string) string {
	parts := strings.Split(addr, ":")
	if len(parts) == 1 {
		if strings.HasPrefix(addr, ":") {
			parts = append([]string{"localhost"}, parts[0])
		} else {
			parts = append(parts, "80")
		}
	}
	return strings.Join(parts, ":")
}
