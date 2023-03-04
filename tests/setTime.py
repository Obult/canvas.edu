# 8193005b

import requests
import json
import time

code = "4f385d17"
url = "http://api.pixels.codam.nl/canvas/single"
urlb = "http://localhost:3000/canvas/nameUser/renameduser"
urlc = "http://localhost:3000/canvas/single"
urld = "http://localhost:3000/admin/timeout?time=0&code=" + code
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
