#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 22 12:50:55 2019

Author: Natal
"""

import pandas as pd
import numpy as np
import pdb
import requests
from clickhouse_driver import Client
from dcrhino3.models.env_config import MwdType
from dcrhino3.helpers.general_helper_functions import init_logging
import json

logger = init_logging(__name__)


class ProcessFlowHelper():
    """
    Facilitates the use of process_flow_json downstream.

    References:


    .. warning::
    """

    def __init__(self, process_flow_path):
        with open(process_flow_path, "r") as fp:
            self.process_flow = json.load(fp)

    @property
    def id(self):
        return self._get_process_flow_id()

    def _get_process_flow_id(self):
        return self.process_flow["id"]