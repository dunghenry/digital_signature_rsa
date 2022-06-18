document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log(CryptoJS);
    var nump = document.getElementById("nump");
    var numq = document.getElementById("numq");
    var nume = document.getElementById("nume");
    var numen = document.getElementById("numen");
    var numd = document.getElementById("numd");
    var numdn = document.getElementById("numde");
    var btnGenerate = document.getElementById("generateKey");
    var btnReset = document.getElementById("reset");
    var btnSignature = document.getElementById("signature");
    var btnSaveSignature = document.getElementById("saveSignature");
    var btnResetSignature = document.getElementById("resetSignature");
    var textContent = document.getElementById("text");
    var hashed = document.getElementById("hashed");
    var upload = document.getElementById("upload");
    var signatureText = document.getElementById("signatureText");

    //Random e
    function randomE() {
      return Math.floor(Math.random() * (7 - 7) + 7);
    }
    //Check SNT
    function soNguyenTo(num) {
      let result;
      for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          return;
        }
        result = num;
      }
      return result;
    }

    //Dowload file
    function download(file, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8, " + encodeURIComponent(text)
      );
      element.setAttribute("download", file);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    btnGenerate.onclick = function () {
      var n = nump.value * numq.value;
      var array = [];
      var phiN = (nump.value - 1) * (numq.value - 1);
      for (var i = 1; i < phiN; i++) {
        if (i % 1 === 0) {
          array.push(i);
        }
      }
      var arrayE = array.filter((item) => soNguyenTo(item));
      var eRandom = randomE();
      var seachD;
      var result;
      for (i = 1; i <= 10; i++) {
        seachD = (1 + phiN * i) / eRandom;
        if (Number.isInteger(seachD)) {
          if (numq.value && numq.value) {
            nume.value = eRandom;
          }
          result = seachD;
        }
      }
      if (numq.value && numq.value) {
        numen.value = n;
        numdn.value = n;
        numd.value = result;
      } else {
        alert("Nhập dữ liệu đầu vào là hai số nguyên tố");
      }
    };
    //Reset public key and private key
    btnReset.onclick = function () {
      nump.value = "";
      numq.value = "";
      nume.value = "";
      numen.value = "";
      numd.value = "";
      numde.value = "";
    };

    //generate signature and hashed text
    btnSignature.onclick = function () {
      if (text.value) {
        var textValue = textContent.value;
        var value = CryptoJS.MD5(textValue, nume.value.toString());
        hashed.value = value;
        var ciphertext = CryptoJS.AES.encrypt(
          textContent.value,
          nume.value
        ).toString();
        signatureText.value = ciphertext;
      } else {
        alert("Không có dữ liệu để thực hiện");
      }
    };

    //Save file signature
    btnSaveSignature.onclick = function () {
      if (signatureText.value) {
        var filename = "signature.txt";
        download(filename, signatureText.value);
      } else {
        alert("Not save signature?");
      }
    };

    //Reset all content
    btnResetSignature.onclick = function () {
      text.value = "";
      hashed.value = "";
      signatureText.value = "";
    };

    //Upload file
    upload.onchange = function (e) {
      var file = upload.files[0];
      var reader = new FileReader();
      reader.addEventListener("load", function (e) {
        textContent.value = e.target.result;
      });
      reader.readAsBinaryString(file);
    };

    var textContentCheck = document.getElementById("textContentCheck");
    var textSignatureCheck = document.getElementById("textSignatureCheck");
    var enterE = document.getElementById("enterE");
    var enterN = document.getElementById("enterN");
    var textContentUpload = document.getElementById("textContentUpload");
    var textSignature = document.getElementById("textSignature");
    var btnConfirm = document.getElementById("btnConfirm");
    var resetSignature = document.getElementById("resetSignature");

    textContentUpload.onchange = function (e) {
      var file = textContentUpload.files[0];
      var reader = new FileReader();
      reader.addEventListener("load", function (e) {
        textContentCheck.value = e.target.result;
      });
      reader.readAsBinaryString(file);
    };
    textSignature.onchange = function (e) {
      var file = textSignature.files[0];
      var reader = new FileReader();
      reader.addEventListener("load", function (e) {
        textSignatureCheck.value = e.target.result.trim();
      });
      reader.readAsBinaryString(file);
    };

    btnConfirm.onclick = function () {
      var e = +enterN.value;
      var n = +enterN.value;
      var bytes = CryptoJS.AES.decrypt(textSignatureCheck.value.trim(), "7");
      var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (e && n && textSignatureCheck.value && textContentCheck) {
        if (textContentCheck.value === decryptedData) {
          alert("Chữ kí chính xác")
        }
        else {
          alert("Chữ kí không chính xác")
        }
      }
      else {
        alert("Thiếu dữ liệu để kiểm tra chữ kí")
      }
    };
  },
  false
);

