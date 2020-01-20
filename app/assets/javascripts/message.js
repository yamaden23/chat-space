$(document).on('turbolinks:load', function() {
  $(function(){
      function buildHTML(message){
          var image = ( message.image ) ? `<img src= ${message.image} alt= "画像" class="lower-message__image" >` : ' ' ;

          var html = `<div class="message" data-id="${message.id}">
                        <div class="upper-message">
                          <div class="upper-message__user-name">
                          ${message.user_name}
                          </div>
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                        <div class="lower-message">
                          <p class="lower-message__content">
                            ${message.content}
                          </p>
                            ${image}
                        </div>
                      </div>`
        return html;
      }

      function scroll() {
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(data){
        console.log("成功")
        var html = buildHTML(data);
        $('#message').append(html);
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
        scroll()
      })
      .fail(function(){
        alert('メッセージを入力してください');
        $('.form__submit').prop('disabled', false);
      })
    });

    var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.message:last').data('id');
      $.ajax({
        url: location.href,
        type:"GET",
        data: {id:message_id},
        dataType:'json',
      })
      .done(function(data) {
        console.log(data)

        data.forEach(function(message){
          var html = buildHTML(message);
          $('#message').append(html);
        })
        scroll()
      })
      .fail(function(data) {
        alert('自動更新に失敗しました')
      });
    } else {
      clearInterval(interval);
    }} , 5000 );
  });
});