const admin = require('firebase-admin');

class Tower {
  constructor(data) {
    this.projectId = data.projectId;
    this.developerId = data.developerId;
    this.towerNumber = data.towerNumber;
    this.towerName = data.towerName;
    this.towerPhase = data.towerPhase;
    this.developerPhase = data.developerPhase;
    this.phaseReraNumber = data.phaseReraNumber;
    this.deliveryTimeline = data.deliveryTimeline;
    this.currentStatus = data.currentStatus;
    this.isDuplicate = data.isDuplicate;
    this.totalFloors = data.totalFloors;
    this.towerCore = data.towerCore;
    this.totalApartments = data.totalApartments;
    this.basementParkingLevels = data.basementParkingLevels;
    this.hasStiltParking = data.hasStiltParking;
    this.lobby = data.lobby;
    this.hasTerrace = data.hasTerrace;
    this.refugeArea = data.refugeArea;
    this.exitStairs = data.exitStairs;
    this.lifts = data.lifts;
    this.createdAt = data.createdAt || admin.firestore.FieldValue.serverTimestamp();
    this.updatedAt = data.updatedAt || admin.firestore.FieldValue.serverTimestamp();
  }

  static collectionName = 'towers';

  static validate(data) {
    const errors = [];

    if (!data.projectId) errors.push('Project ID is required');
    if (!data.developerId) errors.push('Developer ID is required');
    if (typeof data.towerNumber !== 'number') errors.push('Tower number must be a number');
    if (!data.towerName) errors.push('Tower name is required');
    if (!data.deliveryTimeline) errors.push('Delivery timeline is required');
    if (!data.currentStatus) errors.push('Current status is required');
    if (typeof data.totalFloors !== 'number') errors.push('Total floors must be a number');
    if (typeof data.towerCore !== 'number') errors.push('Tower core must be a number');
    if (typeof data.totalApartments !== 'number') errors.push('Total apartments must be a number');
    if (typeof data.basementParkingLevels !== 'number') errors.push('Basement parking levels must be a number');
    if (typeof data.hasStiltParking !== 'boolean') errors.push('Has stilt parking must be a boolean');
    if (typeof data.hasTerrace !== 'boolean') errors.push('Has terrace must be a boolean');
    if (typeof data.exitStairs !== 'number') errors.push('Exit stairs must be a number');
    if (typeof data.lifts !== 'number') errors.push('Lifts must be a number');

    return errors;
  }

  toFirestore() {
    return {
      projectId: this.projectId,
      developerId: this.developerId,
      towerNumber: this.towerNumber,
      towerName: this.towerName,
      towerPhase: this.towerPhase,
      developerPhase: this.developerPhase,
      phaseReraNumber: this.phaseReraNumber,
      deliveryTimeline: this.deliveryTimeline,
      currentStatus: this.currentStatus,
      isDuplicate: this.isDuplicate,
      totalFloors: this.totalFloors,
      towerCore: this.towerCore,
      totalApartments: this.totalApartments,
      basementParkingLevels: this.basementParkingLevels,
      hasStiltParking: this.hasStiltParking,
      lobby: this.lobby,
      hasTerrace: this.hasTerrace,
      refugeArea: this.refugeArea,
      exitStairs: this.exitStairs,
      lifts: this.lifts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Tower;