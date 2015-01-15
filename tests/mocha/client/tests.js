if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("Usage selector", function(){
            before(function(done){
                Session.set("nbUsage", null);
                done();
            });

            it("should show usage picker in the nav section", function(){
                chai.assert($(".navHeader .usagechange").length);
            });

            it("should show ussage picker in the main menu", function(){
                if(!ReactiveStore.get("nbCity")) {
                    chai.assert($("#overlay .usagepicker").length);
                }
            });

            it("should change usage picker view in nav section when chaning usage", function(){
                
                Session.set("nbUsage", "bike");
                Meteor.defer(function(){
                    chai.assert.equal($('.navHeader .usagepicker div').hasClass('bike'),true);
                    chai.assert.equal($('.navHeader .usagepicker div').hasClass('foot'),false);
                });

                Session.set("nbUsage", "foot");
                Meteor.defer(function(){
                    chai.assert.equal($('.navHeader .usagepicker div').hasClass('foot'),true);
                    chai.assert.equal($('.navHeader .usagepicker div').hasClass('bike'),false);
                });
                
            });

        });

        describe("coffe window", function(){
            it("should show/disable coffee button", function(){
                
                ReactiveStore.set("nbCoffee", false);
                Meteor.defer(function(){
                    chai.assert($('.coffeeToggle').length);
                });

                ReactiveStore.set("nbCoffee", true);
                Meteor.defer(function(){
                    chai.assert(!($('.coffeeToggle').length));
                });
                
            });
        });

        describe("Select language", function(){
            before(function(done){
                done();
            });

            it("should show language picker in the key section", function(){
                chai.assert($(".key .langpicker").length);
            });

             it("should show language picker in the city picker main menu", function(){
                if(!ReactiveStore.get("nbCity")) {
                    chai.assert($(".langpickerContainer .langpicker").length);
                }
            });

        });

        describe("SEO title", function(){

            it("should change title to corresponding language", function(){
                chai.expect($('title')).not.to.be.equal('seo.global.title');
            });
           
        });

        describe("SEO desc", function(){

            it("should change description to corresponding language", function(){
                chai.expect($('meta[name=description]')).not.to.be.equal('seo.global.desc');
            });
           
        });

    });
}
