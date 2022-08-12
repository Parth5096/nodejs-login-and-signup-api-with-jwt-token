// include categorys model
const Category = require('./api/schema/index');

const CategoryService={
    FindAll:()=>{
        return Category.find();
    },

    Create:(req)=>{
        // create a category
        let category = new Category(
            {
                name: req.body.name,
                description: req.body.description,
            }
        );
        return category.save();
    },

    Details:(req)=>{
        return Category.findById(req.params.id);
    },

    Update:(req)=>{
        return  Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return Category.findByIdAndRemove(req.params.id);
    }

}

module.exports = CategoryService;