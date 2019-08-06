
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema(
{
    name : String,
    relationship : Number,
    isExpert : Boolean ,
    jobTitle : String,
    avatarUrl : { type: String, default: "" },
    babies : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Baby' }],
	
	facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    local            : {
        email        : String,
        password     : String,
    }

	 
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

// Các phương thức ======================
// Tạo mã hóa mật khẩu
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// kiểm tra mật khẩu có trùng khớp
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);