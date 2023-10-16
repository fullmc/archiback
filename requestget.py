# requests get method
requests = require('requests');

url = 'localhost:3000/'
r = requests.get(url)
print(r.text)