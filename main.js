const fs = require('fs');
const axios = require('axios');

function checkProxy(proxy) {
  axios.get('https://www.example.com', {
    proxy: {
      host: proxy.split(':')[0],
      port: proxy.split(':')[1],
    },
    timeout: 5000,
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(`Рабочий прокси: ${proxy}`);
      }
    })
    .catch((error) => {
      // Проигнорируйте ошибки и продолжайте сканирование
    });
}

function scanProxies(file_path) {
  const proxyList = fs.readFileSync(file_path, 'utf8').split('\n');
  for (const proxy of proxyList) {
    checkProxy(proxy);
  }
}

function main() {
  const file_path = 'proxy_list.txt'; // Укажите путь к вашему файлу с прокси
  scanProxies(file_path);
}

main();
