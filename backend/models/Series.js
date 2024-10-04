const admin = require('firebase-admin');

class Series {
  constructor(data) {
    this.towerId = data.towerId;
    this.seriesName = data.seriesName;
    this.isDuplicate = data.isDuplicate;
    this.typology = data.typology;
    this.bhkType = data.bhkType;
    this.addOns = data.addOns || [];
    this.bedrooms = data.bedrooms;
    this.livingDining = data.livingDining;
    this.bathrooms = data.bathrooms;
    this.balconies = data.balconies;
    this.seriesExitDirection = data.seriesExitDirection;
    this.unitCarpetArea = data.unitCarpetArea;
    this.createdAt = data.createdAt || admin.firestore.FieldValue.serverTimestamp();
    this.updatedAt = data.updatedAt || admin.firestore.FieldValue.serverTimestamp();
  }

  static collectionName = 'series';

  static validate(data) {
    const errors = [];

    if (!data.towerId) errors.push('Tower ID is required');
    if (!data.seriesName) errors.push('Series name is required');
    if (typeof data.isDuplicate !== 'boolean') errors.push('Is duplicate must be a boolean');
    if (!data.typology) errors.push('Typology is required');
    if (!data.bhkType) errors.push('BHK type is required');
    if (!Array.isArray(data.addOns)) errors.push('Add-ons must be an array');
    if (typeof data.bedrooms !== 'number') errors.push('Number of bedrooms must be a number');
    if (!data.livingDining) errors.push('Living/Dining details are required');
    if (typeof data.bathrooms !== 'number') errors.push('Number of bathrooms must be a number');
    if (typeof data.balconies !== 'number') errors.push('Number of balconies must be a number');
    if (!data.seriesExitDirection) errors.push('Series exit direction is required');
    if (typeof data.unitCarpetArea !== 'number') errors.push('Unit carpet area must be a number');

    return errors;
  }

  toFirestore() {
    return {
      towerId: this.towerId,
      seriesName: this.seriesName,
      isDuplicate: this.isDuplicate,
      typology: this.typology,
      bhkType: this.bhkType,
      addOns: this.addOns,
      bedrooms: this.bedrooms,
      livingDining: this.livingDining,
      bathrooms: this.bathrooms,
      balconies: this.balconies,
      seriesExitDirection: this.seriesExitDirection,
      unitCarpetArea: this.unitCarpetArea,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Series;