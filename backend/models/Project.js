const admin = require('firebase-admin');

class Project {
  constructor(data) {
    this.name = data.name;
    this.reraStatus = data.reraStatus;
    this.reraNumber = data.reraNumber;
    this.startingPrice = data.startingPrice;
    this.mediaLinks = data.mediaLinks || [];
    this.status = data.status;
    this.createdAt = data.createdAt || admin.firestore.FieldValue.serverTimestamp();
    this.updatedAt = data.updatedAt || admin.firestore.FieldValue.serverTimestamp();
  }

  static collectionName = 'projects';

  static validate(data) {
    const errors = [];

    if (!data.name) errors.push('Project name is required');
    if (!['Approved', 'Not Approved'].includes(data.reraStatus)) errors.push('RERA status must be either Approved or Not Approved');
    if (data.reraStatus === 'Approved' && !data.reraNumber) errors.push('RERA number is required for approved projects');
    if (typeof data.startingPrice !== 'number') errors.push('Starting price must be a number');
    if (!Array.isArray(data.mediaLinks)) errors.push('Media links must be an array');
    if (!['Active', 'Inactive'].includes(data.status)) errors.push('Status must be either Active or Inactive');

    return errors;
  }

  toFirestore() {
    return {
      name: this.name,
      reraStatus: this.reraStatus,
      reraNumber: this.reraNumber,
      startingPrice: this.startingPrice,
      mediaLinks: this.mediaLinks,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Project;