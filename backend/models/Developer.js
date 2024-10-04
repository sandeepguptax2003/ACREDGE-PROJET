const admin = require('firebase-admin');

class Developer {
  constructor(data) {
    this.name = data.name;
    this.address = data.address;
    this.incorporationDate = data.incorporationDate;
    this.totalProjectsDelivered = data.totalProjectsDelivered;
    this.totalSqFtDelivered = data.totalSqFtDelivered;
    this.reasonForChoosing = data.reasonForChoosing;
    this.websiteLink = data.websiteLink;
    this.status = data.status;
    this.createdAt = data.createdAt || admin.firestore.FieldValue.serverTimestamp();
    this.updatedAt = data.updatedAt || admin.firestore.FieldValue.serverTimestamp();
  }

  static collectionName = 'developers';

  static validate(data) {
    const errors = [];

    if (!data.name) errors.push('Developer name is required');
    if (!data.address) errors.push('Address is required');
    if (!data.incorporationDate) errors.push('Incorporation date is required');
    if (typeof data.totalProjectsDelivered !== 'number') errors.push('Total projects delivered must be a number');
    if (typeof data.totalSqFtDelivered !== 'number') errors.push('Total sq ft delivered must be a number');
    if (!data.websiteLink) errors.push('Website link is required');
    if (!['Active', 'Inactive'].includes(data.status)) errors.push('Status must be either Active or Inactive');

    return errors;
  }

  toFirestore() {
    return {
      name: this.name,
      address: this.address,
      incorporationDate: this.incorporationDate,
      totalProjectsDelivered: this.totalProjectsDelivered,
      totalSqFtDelivered: this.totalSqFtDelivered,
      reasonForChoosing: this.reasonForChoosing,
      websiteLink: this.websiteLink,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Developer;