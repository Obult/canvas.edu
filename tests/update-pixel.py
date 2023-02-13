import requests
import json

class addToQueueDto:
  def __init__(self, width, height, data):
    self.width = width
    self.height = height
    self.data = data

data = addToQueueDto(10, 10, [0, 0, 255, 255])

url = "http://localhost:3000/canvas/single"
headers = {'Content-Type': 'application/json'}

response = requests.post(url, headers=headers, data=json.dumps(data.__dict__))

if response.status_code == 200 | 201:
  print("Successfully sent data")
else:
  print("Failed to send data", response.status_code)
