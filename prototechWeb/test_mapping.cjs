const mysql = require('mysql2/promise');

const getProductImage = (name) => {
  if (!name) return null;
  const cleanName = name.trim();
  const map = {
    "Arduino Uno R3": "Arduino Uno R3.webp",
    "ESP32 WiFi+BT": "ESP32 WiFi+BT.webp",
    "Raspberry Pi Pico": "Raspberry Pi Pico.jpg",
    "Sensor Ultrassônico HC-SR04": "Sensor Ultrassônico HC-SR04.jpg",
    "Módulo Relé 1 Canal": "Módulo Relé 1 Canal.webp",
    "Sensor DHT11": "Sensor DHT11.webp",
    "Display LCD 16x2 I2C": "Display LCD 16x2 I2C.webp",
    "Jumpers Macho-Fêmea (40 un)": "Jumpers Macho-Fêmea (40 un.webp",
    "Protoboard 830 Pontos": "Protoboard 830 Pontos.webp",
    "Sensor PIR Movimento": "Sensor PIR Movimento (HC-SR501).jpg",
    "Módulo Lora 915MHz": "Módulo Lora 915MHz.webp",
    "Servo Motor SG90": "Servo Motor SG90.webp",
    "Bateria LiPo 3.7V": "Bateria LiPo 3.7V.webp",
    "Módulo MP3 DFPlayer": "Módulo MP3 DFPlayer.webp",
    "NFC PN532": "NFC PN532.webp",
    "Kit Resistores (100 un)": "Kit Resistores (100 un).webp",
    "Potenciômetro 10k": "Potenciômetro 10k.webp",
    "Ponte H L298N": "Ponte H L298N.webp",
    "Joystick KY-023": "Joystick KY-023.webp",
    "Sensor de Gás MQ-2": "Sensor de Gás MQ-2.webp",
    "Módulo Bluetooth HC-05": "Módulo Bluetooth HC-05.webp",
    "OLED 0.96 I2C": "OLED 0.96 I2C.webp",
    "Sensor Umidade Solo": "Sensor Umidade Solo.webp",
    "Cabo USB AB 1.5m": "Cabo USB AB 1.5m.webp",
    "ESP8266 NodeMCU": "ESP8266 NodeMCU V3.webp"
  };

  let fileName = map[cleanName];
  if (!fileName) {
    const lower = cleanName.toLowerCase();
    if (lower.includes("arduino")) fileName = "Arduino Uno R3.webp";
    else if (lower.includes("esp32")) fileName = "ESP32 WiFi+BT.webp";
    else if (lower.includes("pico") || lower.includes("raspberry pi pico")) fileName = "Raspberry Pi Pico.jpg";
    else if (lower.includes("ultrassônico") || lower.includes("hc-sr04")) fileName = "Sensor Ultrassônico HC-SR04.jpg";
    else if (lower.includes("relé") || lower.includes("rele")) fileName = "Módulo Relé 1 Canal.webp";
    else if (lower.includes("dht11") || lower.includes("dht22") || lower.includes("dht")) fileName = "Sensor DHT11.webp";
    else if (lower.includes("lcd")) fileName = "Display LCD 16x2 I2C.webp";
    else if (lower.includes("jumper")) fileName = "Jumpers Macho-Fêmea (40 un.webp";
    else if (lower.includes("protoboard")) fileName = "Protoboard 830 Pontos.webp";
    else if (lower.includes("pir") || lower.includes("movimento")) fileName = "Sensor PIR Movimento (HC-SR501).jpg";
    else if (lower.includes("lora")) fileName = "Módulo Lora 915MHz.webp";
    else if (lower.includes("servo") || lower.includes("sg90")) fileName = "Servo Motor SG90.webp";
    else if (lower.includes("lipo") || lower.includes("bateria")) fileName = "Bateria LiPo 3.7V.webp";
    else if (lower.includes("mp3") || lower.includes("dfplayer")) fileName = "Módulo MP3 DFPlayer.webp";
    else if (lower.includes("nfc") || lower.includes("pn532")) fileName = "NFC PN532.webp";
    else if (lower.includes("resistor")) fileName = "Kit Resistores (100 un).webp";
    else if (lower.includes("potenciômetro") || lower.includes("potenciometro")) fileName = "Potenciômetro 10k.webp";
    else if (lower.includes("ponte h") || lower.includes("l298n")) fileName = "Ponte H L298N.webp";
    else if (lower.includes("joystick")) fileName = "Joystick KY-023.webp";
    else if (lower.includes("gás") || lower.includes("gas") || lower.includes("mq-2")) fileName = "Sensor de Gás MQ-2.webp";
    else if (lower.includes("bluetooth") || lower.includes("hc-05")) fileName = "Módulo Bluetooth HC-05.webp";
    else if (lower.includes("oled")) fileName = "OLED 0.96 I2C.webp";
    else if (lower.includes("solo") || lower.includes("umidade")) fileName = "Sensor Umidade Solo.webp";
    else if (lower.includes("usb") || lower.includes("cabo")) fileName = "Cabo USB AB 1.5m.webp";
    else if (lower.includes("esp8266") || lower.includes("nodemcu")) fileName = "ESP8266 NodeMCU V3.webp";
  }

  return fileName;
};

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '12345',
      database: 'prototech_db',
      port: 3306
    });

    const [rows] = await conn.query('SELECT nome_produto FROM Produto');
    console.log('=== TESTE DE MAPEAMENTO DE IMAGENS ===');
    for (const row of rows) {
      const name = row.nome_produto;
      const fileName = getProductImage(name);
      const matched = fileName ? 'SIM' : 'NÃO';
      console.log(`Produto: "${name}" -> File: "${fileName}" | Matched: ${matched}`);
    }
    conn.end();
  } catch (err) {
    console.error('Erro no teste:', err.message);
  }
})();
