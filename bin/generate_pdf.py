import glob, os
from PIL import Image
from fpdf import FPDF
import time
from dcrhino3.models.env_config import EnvConfig
from dcrhino3.helpers.process_flow_helper import ProcessFlowHelper
import argparse

def generate_pdf(mine_name, env_config_path, process_flow_path):
    envConfig = EnvConfig(env_config_path)
    pf_helper = ProcessFlowHelper(process_flow_path)
    process_path = envConfig.get_hole_h5_processed_cache_folder('bma')
    pf_id = pf_helper.id
    pdf_path = os.path.join(process_path, "pdf", pf_id)
    if not os.path.exists(pdf_path):
        os.makedirs(pdf_path)

    glob_path = os.path.join(process_path, "**", pf_id, "*.png")
    t0 = time.time()

    imagelist = sorted(glob.glob(glob_path))

    total_files = len(imagelist)
    counter = 1

    chunk_size = 10
    part = 1
    while counter < total_files:
        pdf = FPDF()
        chunk_start = (part - 1) * chunk_size
        chunk_end = chunk_start + chunk_size
        if chunk_end > total_files:
            chunk_end = total_files
        print("Part {} from file {} to {}".format(part, chunk_start + 1, chunk_end))
        for image in imagelist[chunk_start:chunk_end]:
            print("adding file {} of {}".format(counter, total_files))
            pdf.add_page("L")
            pdf.image(image, 0, 0, 290, 145)
            counter += 1
        name = os.path.join(pdf_path, "{}_{}_part_{}.pdf".format(mine_name, pf_id, part))
        print("Saving as {}".format(name))
        pdf.output(name, "F")
        part += 1

    print("Done in {} seconds".format(round(time.time()-t0,2)))

if __name__ == '__main__':
    use_argparse = True
    if use_argparse:
        argparser = argparse.ArgumentParser(description="Copyright (c) 2019 DataCloud")
        argparser.add_argument("mine_name", metavar="mine_name", type=str, help="Mine Name")
        argparser.add_argument("-env", '--env_config_path', help="Path to optional env config file", default=False)
        argparser.add_argument("-f", '--process_flow', help="Path to the process flow", default=False)
        args = argparser.parse_args()
        mine_name = args.mine_name
        if args.env_config_path is None:
            env_config_path = "env_config.json"
        else:
            env_config_path = args.env_config_path
        process_flow_path = args.process_flow
    else:
        mine_name = "'bma'"
        process_flow_path = "/mnt/deploy/home/deploy/dcrhino_lib_3/bin/process_flows/v3.2_multipass_bma_no_ss_052219" \
                            ".json"
        env_config_path = "/mnt/deploy/home/deploy/dcrhino_lib_3/bin/env_config.json"

    generate_pdf(mine_name, env_config_path,process_flow_path)