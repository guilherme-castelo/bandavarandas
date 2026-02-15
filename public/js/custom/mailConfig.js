(function () {
  const ambienteProducao = true;

  // Inicializa o EmailJS com seu User ID
  emailjs.init("mV6vww1OlLV7b4G0k"); // Pegue isso no painel do EmailJS

  document.getElementById("emailForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recarregar a página

    let email = document.getElementById("emailInput").value;
    let name = document.getElementById("nameInput").value;
    let message = document.getElementById("messageInput").value;

    if (email === "" || name === "" || message === "") {
      alert("Por favor, insira valores válidos.");
      return;
    }
    // Captura a data e hora atual do navegador
    let now = new Date();
    let formattedDate = now.toLocaleDateString("pt-BR"); // Formato: dd/mm/yyyy
    let formattedTime = now.toLocaleTimeString("pt-BR"); // Formato: hh:mm:ss

    // Captura a URL do site
    let currentUrl = window.location.href;

    if (ambienteProducao) {
      // Envia o e-mail usando o template configurado no EmailJS Banda Varandas
      emailjs.send("service_qr9612k", "template_xe1isaj", {
        from_email: email,
        from_name: name,
        message: message,
        reply_to: email,
        date_time: `${formattedDate} ${formattedTime}`, // Envia data e hora formatadas
        site_url: currentUrl // Envia a URL do site
      }).then(function (response) {
        alert("Email enviado com sucesso!");
        document.getElementById("emailForm").reset();
      }, function (error) {
        alert("Erro ao enviar email: " + JSON.stringify(error));
      });
    } else {

      // Envia o e-mail usando o template configurado no EmailJS Teste Guilherme
      emailjs.send("service_lwgg0a6", "template_flcjs8i", {
        from_email: email,
        from_name: name,
        message: message,
        reply_to: email,
        date_time: `${formattedDate} ${formattedTime}`, // Envia data e hora formatadas
        site_url: currentUrl // Envia a URL do site
      }).then(function (response) {
        alert("Ambiente teste. Email enviado com sucesso!");
        document.getElementById("emailForm").reset();
      }, function (error) {
        alert("Ambiente teste. Erro ao enviar email: " + JSON.stringify(error));
      });
    }

  });
})();