# MLModelScope

[![Build Status](https://dev.azure.com/yhchang/c3sr/_apis/build/status/c3sr.mlmodelscope?branchName=master)](https://dev.azure.com/yhchang/c3sr/_build/latest?definitionId=10&branchName=master)

# [Documentation](https://docs.mlmodelscope.org/)

The current landscape of Machine Learning (ML) and Deep Learning (DL) is rife with non-uniform models, frameworks, and system stacks but lacks standard tools to evaluate and profile models or systems.
Due to the absence of such tools, the current practice for evaluating and comparing the benefits of proposed AI innovations (be it hardware or software) on end-to-end AI pipelines is both arduous and error prone --- stifling the adoption of the innovations.

MLModelScope is a hardware/software agnostic, extensible and customizable platform for evaluating and profiling ML models across datasets/frameworks/hardware, and within AI application pipelines.
MLModelScope lowers the cost and effort for performing model evaluation and profiling, making it easier for others to reproduce, evaluate, and analyze acurracy or performance claims of models and systems.

It is designed to aid in:

1. reproducing and comparing with published models, and designing models with performance and deployment in mind,
2. understanding the model performance (within realworld AI workflows) and its interaction with all levels of the hardware/software stack
3. discovering models, frameworks and hardware that are applicable to users' datasets.


To achieve this, MLModelScope:

- Provides a consistent evaluation, aggregation, and reporting system by defining
  - techniques to specify and provision workflows with HW/SW stacks
  - abstractions for evaluation and profiling using different frameworks
  - data consumption for evaluation outputs
- Enables profiling of experiments throughout the entire pipeline and at different abstraction levels (application, model, framework, layer, library and hardware, as shown on the right)
- Is framework and hardware agnostic - with current support for TensorFlow, MXNet, TensorRT, Caffe, Caffe2, CNTK running on X86, PowerPC, and ARM CPU with GPU and FPGA
- Is extensible and customizable - allowing users to extend MLModelScope by adding models, frameworks, or library and system profilers.
- Can run experiments on separate machines, and behind firewall (does not exposing model weights or machine specification)
- Allows parallel evaluation (multiple instantiations of the same experiment set-up across systems)
- Specifies model and framework resources as asset files which can be added easily, even at runtime


MLModelScope can be used as an application with a command line, API or web interface, or can be compiled into a standalone library. We also provide an online hub of continuously updated assets, evaluation results, and access to hardware resources — allowing users to discover and evaluate models without installing or configuring systems.

# Use the Web UI through Pre-built Docker Images

We have [pre-built docker images](https://hub.docker.com/r/c3sr/mlmodelscope/tags) on Dockerhub. The image is `c3sr/mlmodelscope:amd64-cpu-latest`. The entrypoint is set as `mlmodelscope web` and the port is 8088.

An example run is

```
docker run --rm -d -p 8088:8088 --name=mlmodelscope_web_ui \
           -v ~/.carml_config.yml:/root/.carml_config.yml \
           c3sr/mlmodelscope:amd64-cpu-latest
```

Then the web will be on [http://localhost:8088](localhost:8088).

# Running the Unit Tests
1. Add the environment variable `REACT_APP_API_URL=http://api.local.mlmodelscope.org`
1. Run `npm test` for the interactive test runner.
