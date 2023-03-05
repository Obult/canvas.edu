# 8193005b

import requests
import json
import time

url = "http://api.pixels.codam.nl"
code = "8c9693ba"
timeout = 420
urld = url + f"/admin/timeout?time={timeout}&code=" + code
url = urld
headers = {'Content-Type': 'application/json',
           'x-real-ip': 'my.amazing.fake.ip'}

class pxlInfo:
  def __init__(self, width, height, data):
    self.width = width
    self.height = height
    self.data = data

x, y = 20, 80 # starting coordinates
data = pxlInfo(x, y, [0, 33, 255, 255])
response = requests.post(url, headers=headers)

if response.status_code == 200 | 201:
  print("Successfully sent data")
else:
  print("Failed to send data", response.status_code)
