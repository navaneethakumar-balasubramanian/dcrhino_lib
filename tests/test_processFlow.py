from unittest import TestCase
import unittest

from dcrhino3.process_flow.process_flow import ProcessFlow

class TestProcessFlow(TestCase):
    pf = ProcessFlow()

    def test_process_flow(self):
        print (self.pf)
        assert 1 == 1

if __name__ == '__main__':
    unittest.main()