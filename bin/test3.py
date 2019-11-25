from googleapiclient.discovery import build
from google.oauth2 import service_account

#SCOPES = ['https://www.googleapis.com/auth/androidenterprise']
SCOPES = ['https://www.googleapis.com/auth/androidmanagement']
SERVICE_ACCOUNT_FILE = '/home/thiago/Downloads/DcMobile-ea62daa25d98.json'


credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
project_id = 'dcmobile-256621'
#project_id = '151854722744'


enterprise_name = 'enterprises/LC02hs63ip'
delegated_credentials = credentials.with_subject('thiago@datacloud.rocks')
service = build('androidmanagement', 'v1', credentials=credentials)

#enterprise_id = 'enterprises/C02xnxde5'
#enterprise_token = 'EAEQ6V4muwlqp-4gYdCLGga4hWoidpDXDP0aWKv-xugNPl-dG93zMNED3386eg_qvdzxYqoiCBA_N0lQEbkdo2zvPU1DPFn_GU40cLrRqHvCuxgAOntoXfo0'
#service = build('androidenterprise', 'v1', credentials=credentials)



#signup_url = service.signupUrls().create(projectId=project_id,callbackUrl='https://localhost:8080/enrollmentcomplete?session=12345').execute()
#print (signup_url)
#qq = service.enterprises().create(
#    projectId=project_id,
#    signupUrlName=signup_url['name'],
#    enterpriseToken=enterprise_token,
#    body={}
#).execute()
#qq = service.enterprises().create(projectId='enterprise/{}'.format(enterprise_id),enterpriseToken=enterprise_token)
import json

policy_name = enterprise_name + '/policies/policy1'

policy_json = '''
{

  "addUserDisabled":true,
  "safeBootDisabled": true,
    "screenCaptureDisabled": true,
    "factoryResetDisabled": false,
    "cameraDisabled": true,
    "keyguardDisabled": true,
    "appAutoUpdatePolicy":"Always",
    "systemUpdate": {
      "type": "WINDOWED",
      "startMinutes": 120,
      "endMinutes": 240
    },
  "applications": [

    {
        "installType": "REQUIRED_FOR_SETUP", 
        "packageName": "rocks.datacloud.dcmobile",
        "defaultPermissionPolicy": "GRANT",
        "minimumVersionCode": 23
    },
    {
        "installType": "BLOCKED", 
        "packageName": "com.android.chrome"
    }
    
  ],
  "debuggingFeaturesAllowed": true
}
'''

service.enterprises().policies().patch(
    name=policy_name,
    body=json.loads(policy_json)
).execute()
qq = service.enterprises().policies().list(parent=enterprise_name).execute()
print(qq)
qq = service.enterprises().applications().get(name=enterprise_name + "/applications/rocks.datacloud.dcmobile").execute()
print(qq)
enrollment_token = service.enterprises().enrollmentTokens().create(
    parent=enterprise_name,
    body={"policyName": policy_name}
).execute()

from urllib.parse import urlencode

image = {
    'cht': 'qr',
    'chs': '500x500',
    'chl': enrollment_token['qrCode']
}

qrcode_url = 'https://chart.googleapis.com/chart?' + urlencode(image)


#webtoken = service.enterprises().webTokens().create(parent=enterprise_id).execute()

print('Please visit this URL to scan the QR code:', qrcode_url)

#qq = service.users().list(enterpriseId=enterprise_id,email='device@datacloud.rocks').execute()
#print(qq)