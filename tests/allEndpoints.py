import requests
import json
import time

url = "http://localhost:3000/"

headers = {'Content-Type': 'application/json',
           'x-real-ip': 'my.amazing.fake.ip'}

# place pixel
response = requests.post(url + 'canvas/single', headers=headers, data=json.dumps({'width': 42, 'height': 42, 'data': [0, 25, 255, 255]}))
print(response, response.content)
# 201 (creation of recourse), could return 200 instead with 204 (no content)

# set timeout
code = '4f385d17' #set code from backend here
timeout = 42
timeoutQuery = f'admin/timeout?time={timeout}&code=' + code
response = requests.post(url + timeoutQuery, headers=headers)
print(response, response.content)
# 201 (creation of recourse), could return 200 instead with 204 (no content)

# set/change username
new_username = 'username'
response = requests.post(url + 'canvas/nameUser/' + new_username, headers=headers)
print(response, response.content)
# 201, apropriate status code

# get Pixelinfo
x = 42
y = 42
pXquery = f'?x={x}&y={y}'
response = requests.get(url + 'canvas/coordinates' + pXquery, headers=headers)
print(response, response.content)
# 200, apropriate status code