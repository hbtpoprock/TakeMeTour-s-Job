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

    $("#get-joke-btn").click(function () {

        let url = getUrl();

        req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.send();

        req.onload = function () {
            let content = "";

            let json = JSON.parse(req.responseText);

            console.log("json:" + json);
            console.log("JSON.stringify(json):" + JSON.stringify(json));

            for (i = 0; i < json.value.length; i++) {
                joke = json.value[i].joke;

                content += '<li class="joke">' + joke + "</li>";

                console.log("i:" + i);
                console.log("joke[" + json.value[i].id + "]: " + joke);
            }

            $("#json-obj").html(content);
        };
    });
});