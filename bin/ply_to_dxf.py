import ezdxf
import trimesh


mesh = trimesh.load_mesh('/home/thiago/Downloads/coal_models/Coal_Grids_RAMP STRIP_3.0 GEOLOGY_3.2 STGCM_3.2.1 ROOF_SWCMB2_SRG.ply')
faces = mesh.to_dict()['faces']
vertices = mesh.to_dict()['vertices']

doc = ezdxf.new('R2010')  # MESH requires DXF R2000 or later
msp = doc.modelspace()
mesh = msp.add_mesh()
mesh.dxf.subdivision_levels = 0  # do not subdivide cube, 0 is the default value

with mesh.edit_data() as mesh_data:
    for face in faces:
        points = []
        for point in face:
            p = vertices[point]
            points.append(p)
        mesh_data.add_face(points)

    #mesh_data.optimize()

doc.saveas("cube_mesh_1.dxf")

print (mesh)