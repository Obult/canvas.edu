import requests
import json

class addToQueueDto:
  def __init__(self, x, y, color):
    self.x = x
    self.y = y
    self.color = color

data = addToQueueDto(100, 100, [0, 0, 255, 255])

url = "http://localhost:3000/canvas/single"
headers = {'Content-Type': 'application/json'}

response = requests.post(url, headers=headers, data=json.dumps(data.__dict__))

if response.status_code == 200:
  print("Successfully sent data")
else:
  print("Failed to send data", response.status_code)
