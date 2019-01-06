/*jshint esversion: 6 */

$(document).ready(function () {

    function getNumValue() {
        let num = 1;

        if ($(".number-input-box").val()) {
            num = $(".number-input-box").val();
        }

        console.log('$(".number-input-box").val(): ' + $(".number-input-box").val());
        console.log('Boolean($(".number-input-box").val()): ' + Boolean($(".number-input-box").val()));
        console.log("num: " + num);

        return num;
    }

    function getUrl() {
        let num = getNumValue();
        let url = "http://api.icndb.com/jokes/random/";

        if ($('#firstName').val().trim() || $('#lastName').val().trim()) {
            url += num + '?';
            url += 'firstName=' + $('#firstName').val().trim();
            url += '&';
            url += 'lastName=' + $('#lastName').val().trim();
        } else {
            url += num;
        }
        console.log("url:" + url);

        return url;
    }

    function iterateObj(obj) {
        let content = "";

        for (i = 0; i < obj.value.length; i++) {
            let joke = obj.value[i].joke;

            content += '<li class="joke">' + joke + "</li>";

            console.log("i:" + i);
            console.log("joke[" + obj.value[i].id + "]: " + joke);
        }
        return content;
    }

    $("#get-joke-btn").click(function () {
        let url = getUrl();

        req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.send();

        console.log('req.status before load: ' + req.status);

        $("#json-obj").html('<div class="loader"></div>');
        $(".temp").hide();
        $(".loader").show();

        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                $(".loader").hide();
                if (req.status === 200) {
                    console.log('req.status after req sent: ' + req.status);

                    let json = JSON.parse(req.responseText);

                    console.log("json:" + json);
                    console.log("JSON.stringify(json):" + JSON.stringify(json));

                    $("#json-obj").html(iterateObj(json));
                } else {
                    console.log('req.status after req sent: ' + req.status);
                    console.log('req.statusText: ' + req.statusText);

                    $("#json-obj").html('<span class="temp">Oops! Something went wrong.</span>');
                }
            }
        };
    });
});