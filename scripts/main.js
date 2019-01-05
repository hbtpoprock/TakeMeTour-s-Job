/*jshint esversion: 6 */

$(document).ready(function () {
    let num = 1;
    let url = '';

    function getNumValue() {
        if ($(".number-input-box").val()) {
            num = $(".number-input-box").val();
        } else {
            num = 1;
        }
        console.log("num: " + num);
    }

    function getUrl() {
        url = "http://api.icndb.com/jokes/random/";

        if ($('#firstName').val().trim() || $('#lastName').val().trim()) {
            url += num + '?';
            url += 'firstName=' + $('#firstName').val().trim();
            url += '&';
            url += 'lastName=' + $('#lastName').val().trim();
        } else {
            url += num;
        }
        console.log("url:" + url);
    }

    $("#get-joke-btn").click(function () {

        getNumValue();
        getUrl();

        req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.send();

        req.onload = function () {
            let content = "";

            json = JSON.parse(req.responseText);

            console.log("json:" + json);
            console.log("JSON.stringify(json):" + JSON.stringify(json));

            for (i = 0; i < json.value.length; i++) {
                joke = json.value[i].joke;

                content += '<p class="joke">' + (i + 1) + "." + " " + joke + "</p>";

                console.log("i:" + i);
                console.log("joke[" + i + "]: " + joke);
            }
            $("#json-obj").html(content);
        };
    });
});