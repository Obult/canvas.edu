import requests
import json

url = "http://api.pixels.codam.nl/canvas/single"
urlb = "http://localhost:3000/canvas/nameUser/renameduser"
headers = {'Content-Type': 'application/json',
           'x-real-ip': 'my.amazing.fake.ip'}

class pxlInfo:
  def __init__(self, width, height, data):
    self.width = width
    self.height = height
    self.data = data

# class name:
#   def __init__(self, name):
#     self.username = name

# name = name('newName')
# response = requests.post(urlb, headers=headers)

x, y = 20, 180 # starting coordinates
for i in range(100):
    # create pxlInfo object with updated coordinates
    data = pxlInfo(x, y, [0, 25, 255, 255])
    response = requests.post(url, headers=headers, data=json.dumps(data.__dict__))
    x += 1 # move one unit to the right
    y -= 2 # move one unit up

x, y = 20, 180 # starting coordinates
for i in range(100):
    # create pxlInfo object with updated coordinates
    data = pxlInfo(x, y, [255, 0, 0, 255])
    response = requests.post(url, headers=headers, data=json.dumps(data.__dict__))
    x += 1 # move one unit to the right
    y -= 2 # move one unit up

# data = pxlInfo(199, 199, [0, 0, 0, 255, 1], "name")
# response = requests.post(url, headers=headers, data=json.dumps(data.__dict__))

if response.status_code == 200 | 201:
  print("Successfully sent data")
else:
  print("Failed to send data", response.status_code)
