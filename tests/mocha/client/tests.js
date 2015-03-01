if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

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
