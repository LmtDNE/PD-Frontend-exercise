/* Use JavaScript to retrieve and parse user data (list and details) from the PagerDuty demo account.  Then, populate the user list, and add behavior to populate the details on user click.

The following JS Frameworks are readily loaded and available:
* jQuery
* Handlebars
* PDJS API Library (https://github.com/eurica/pdjs)

**You can use any libraries you wish, or none at all.  These are just here for assistance if desired**

Any framework/approach is acceptable, but the [PDJS](https://github.com/eurica/pdjs) library is available and specifically designed to obtain our data.

Full documentation for the API is at https://developer.pagerduty.com/documentation/rest

Sample of data returned:
* GET /users (https://gist.githubusercontent.com/anonymous/1d97eeea63168bf82bcc/raw/eaede8a260a4b6cb76bfeddca3da5b26352c4c30/users.json)
* GET /users/:id (https://gist.githubusercontent.com/anonymous/8a9df6ba93bd66c979da/raw/d406ebc53d4ff698ba36e4a9f272060e282fb969/user.json)
* GET /users/:id?include[]=contact_methods (https://gist.githubusercontent.com/anonymous/fbac6a725236eccd3e24/raw/8924f329c6aac9e9fd80eee9113493d91ab62d32/user_contact_methods.json)

*/

/****** BEGIN HERE *******/

/* only if you need this API wrapper library */
 $(document).ready(function() { 

  var data;
  var PDJS = new PDJSobj({
    subdomain: "webdemo",
    token: "CkNpsqH9i6yTGus8VDzA",
  });

  //make get request to PagerDuty API to recieve 50 users
  PDJS.api({
    res: "/users",
    data: {
      limit: 50
    },
    success: function (json) {
      data = json;

    }

  });

  var userData = data.users
  
  //loop through returned array of user objects
  for(var i = 0; i < userData.length; i++){
    //append li items with class, id, data-id, and data-color to the ul element with the class name of user__list
    $(".user__list").append("<li " + 
      "class=user " + 
      "id= user--" + userData[i].id +
      " data-id=" + userData[i].id +
      " data-color=" + userData[i].color +">" +
          "<p class=user__name>" + userData[i].name + "</p>" +
          "<p class=user__role>" + userData[i].role + "&nbsp;" + "</p>" +
          "<p class=user__email>"+ " " + userData[i].email + "</p>" +
      "</li>")
  }  
    //Bind click event to all li elemnents with the class user__list
    $(".user__list li").click(function() {
      //store id for the li element clicked 
      var userId = $(this).attr('data-id');
      var userInfo;
      //iterate through the userData
      userData.forEach(function(element) {
        //if there is a match between id's set userInfo to object
        if(userId === element.id){
          userInfo = element;
        } 
      });

      //Replace html with information of the user clicked on
      $(".user__placeholder").html(
          "<div class=user id=user--" + userInfo.id + ">" +
              "<h2 class=user__name>" + userInfo.name + "</h2>" +

              "<div class=user__info>" +
                "<img class=user__avatar src="+ userInfo.avatar_url +"&s=320" + " width=320>" +
                "<div class=user__details>" +
                  "<h3 class=user__section> Details </h3>" +
                  "<ul class=user__details-list>" +
                    "<li>Email: " + userInfo.email +"</li>" +
                    "<li>Role: " + userInfo.role + "</li>" +
                    "<li>Time Zone: " + userInfo.time_zone + "</li>" +
                  "</ul>" +

                  "<h3 class=user__section>Contact Methods</h3>" +
                  "<ul class=user__details-list>" +
                    "<li>"+ userInfo.email +"</li>" +
                  "</ul>" +
                "</div>" +
              "</div>" +
            "</div>"
        );
    })
   
  })























