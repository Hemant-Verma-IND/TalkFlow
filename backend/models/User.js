const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, // Prevents duplicate usernames
    trim: true    // Removes spaces
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, // Prevents duplicate emails
    trim: true,
    lowercase: true // Standardizes email to lowercase
  },
  password: { type: String, required: true },
  archives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Archive' }]
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(12));
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);