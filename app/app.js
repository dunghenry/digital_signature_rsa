document.addEventListener(
    'DOMContentLoaded',
    function () {
        var nump = document.getElementById('nump');
        var numq = document.getElementById('numq');
        var nume = document.getElementById('nume');
        var numen = document.getElementById('numen');
        var numd = document.getElementById('numd');
        var numdn = document.getElementById('numde');
        var btnGenerate = document.getElementById('generateKey');
        var btnReset = document.getElementById('reset');
        var btnSignature = document.getElementById('signature');
        var btnSaveSignature = document.getElementById('saveSignature');
        var btnResetSignature = document.getElementById('resetSignature');
        var btnMove = document.getElementById('move');
        var textContent = document.getElementById('text');
        var hashed = document.getElementById('hashed');
        var upload = document.getElementById('upload');
        var signatureText = document.getElementById('signatureText');
        var d;
        var e;
        var sn;
        var chuki;
        //hashed text - hàm băm
        const hashCode = function (s) {
            var h = 0,
                l = s.length,
                i = 0;
            if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
            return h;
        };

        //Random e
        function randomE(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        //Check SNT
        function soNguyenTo(n) {
            if (n < 2) {
                return 0;
            }
            var squareRoot = Math.sqrt(n);
            var i;
            for (i = 2; i <= squareRoot; i++) {
                if (n % i == 0) {
                    return 0;
                }
            }
            return true;
        }
        //Dowload file
        function download(file, text) {
            var element = document.createElement('a');
            element.setAttribute(
                'href',
                'data:text/plain;charset=utf-8, ' + encodeURIComponent(text),
            );
            element.setAttribute('download', file);
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
            var eRandom = randomE(arrayE);
            e = eRandom;
            sn = n;
            var seachD;
            var result;
            seachD = (1 + phiN * 4) / eRandom;
            d = seachD;
            console.log(e, d, sn);
            if (numq.value && numq.value) {
                result = parseInt(seachD);
                nume.value = eRandom;
            }
            if (numq.value && numq.value) {
                numen.value = n;
                numdn.value = n;
                numd.value = result;
            } else {
                alert('Nhập dữ liệu đầu vào là hai số nguyên tố');
            }
        };
        //Reset public key and private key
        btnReset.onclick = function () {
            nump.value = '';
            numq.value = '';
            nume.value = '';
            numen.value = '';
            numd.value = '';
            numde.value = '';
        };

        //generate signature and hashed text
        btnSignature.onclick = function () {
            if (text.value) {
                var textValue = textContent.value;
                var signature = hashCode(textValue);
                console.log(signature);
                var value = CryptoJS.MD5(textValue, nume.value.toString());
                hashed.value = value;
                var ciphertext = Math.pow(signature, parseInt(nume.value)) % parseInt(numdn.value);
                signatureText.value = ciphertext;
                chuki = ciphertext;
            } else {
                alert('Không có dữ liệu để thực hiện');
            }
        };

        //Save file signature
        btnSaveSignature.onclick = function () {
            if (signatureText.value) {
                var filename = 'signature.txt';
                download(filename, signatureText.value);
            } else {
                alert('Not save signature?');
            }
        };

        //Reset all content
        btnResetSignature.onclick = function () {
            text.value = '';
            hashed.value = '';
            signatureText.value = '';
        };

        //Upload file
        upload.onchange = function (e) {
            var file = upload.files[0];
            var reader = new FileReader();
            reader.addEventListener('load', function (e) {
                textContent.value = e.target.result;
            });
            reader.readAsText(file);
        };

        //Get elements
        var textContentCheck = document.getElementById('textContentCheck');
        var textSignatureCheck = document.getElementById('textSignatureCheck');
        var enterE = document.getElementById('enterE');
        var enterN = document.getElementById('enterN');
        var textContentUpload = document.getElementById('textContentUpload');
        var textSignature = document.getElementById('textSignature');
        var btnConfirm = document.getElementById('btnConfirm');
        var resetCheckSignature = document.getElementById('resetCheckSignature');

        //Upload
        textContentUpload.onchange = function (e) {
            var file = textContentUpload.files[0];
            var reader = new FileReader();
            reader.addEventListener('load', function (e) {
                textContentCheck.value = e.target.result;
            });
            reader.readAsText(file);
        };
        textSignature.onchange = function (e) {
            var file = textSignature.files[0];
            var reader = new FileReader();
            reader.addEventListener('load', function (e) {
                textSignatureCheck.value = e.target.result.trim();
            });
            reader.readAsText(file);
        };

        btnConfirm.onclick = function () {
            var soe = +enterE.value;
            var son = +enterN.value;
            var signature = hashCode(textContentCheck.value);
            var ciphertext = Math.pow(signature, parseInt(soe)) % parseInt(son);
            console.log(parseInt(textSignatureCheck.value), ciphertext);
            if (soe && son && textSignatureCheck.value && textContentCheck.value) {
                if (soe === e && son === sn) {
                    //n, e -> giai ra khoa bi mat
                    if (parseInt(textSignatureCheck.value) === ciphertext) {
                        alert('Tài liệu gửi đi không bị chỉnh sửa gì.Chữ kí đúng');
                    } else {
                        alert('Tài liệu gửi đi đã bị chỉnh sửa.Chữ kí không đúng');
                    }
                } else {
                    alert('Khóa không hợp lệ');
                }
            } else {
                alert('Thiếu dữ liệu để kiểm tra chữ kí');
            }
        };
        resetCheckSignature.onclick = function () {
            textContentCheck.value = '';
            textSignatureCheck.value = '';
            enterE.value = '';
            enterN.value = '';
        };
        btnMove.onclick = function () {
            textContentCheck.value = textContent.value;
            textSignatureCheck.value = signatureText.value;
            enterE.value = nume.value;
            enterN.value = numen.value;
        };
    },
    false,
);
