const exbs=require('express-handlebars');

const hbs=exbs.create({
    helpers:{
        compare: function(one, comparator, two){
            if (eval(one+comparator+two)){
                return true;
            }

            else{
                return false;
            }
        }
    }
})

