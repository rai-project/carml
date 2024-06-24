import { useGLTF, MeshRefractionMaterial, useEnvironment } from '@react-three/drei'
import ring3d from "./testData/diamondRing/3-stone-transformed.glb"
import * as THREE from 'three'


export default function RingExample({ frame, diamonds, ...props }) {
    const { nodes, materials } = useGLTF(ring3d)
    const env = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })

    return (
      <group {...props} dispose={null}>
        <mesh castShadow geometry={nodes.mesh_0.geometry}>
          <meshStandardMaterial color={frame} roughness={0.15} metalness={1} envMapIntensity={1.5} />
        </mesh>
        <mesh castShadow geometry={nodes.mesh_9.geometry} material={materials.WhiteMetal} />
        <instancedMesh castShadow args={[nodes.mesh_4.geometry, null, 65]} instanceMatrix={nodes.mesh_4.instanceMatrix}>
          <MeshRefractionMaterial color={diamonds} side={THREE.DoubleSide} envMap={env} aberrationStrength={0.02} toneMapped={false} />
        </instancedMesh>
      </group>
    )
  }


// See: https://codesandbox.io/p/sandbox/diamond-ring-3ywzzx?file=%2Fsrc%2FApp.js
// Another example here: https://medium.com/@valentinagaravaglia/rendering-a-3d-model-with-next-js-13-typescript-react-three-fiber-and-react-three-drei-84476c3b6a5d
