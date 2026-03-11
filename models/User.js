const mongoose = require('mongoose');

const USER_ROLES = ['ADMIN', 'ARTIST', 'CLIENT'];

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, default: 'CLIENT' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    roles: [this.role],
    isActive: this.isActive
  };
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
