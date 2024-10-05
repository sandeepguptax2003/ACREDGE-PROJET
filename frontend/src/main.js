document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const addLinks = document.querySelectorAll('[id^="add-"]');
    const manageLinks = document.querySelectorAll('[id^="manage-"]');

    addLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = e.target.id.split('-')[1];
            loadAddForm(type);
        });
    });

    manageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = e.target.id.split('-')[1];
            loadManageView(type);
        });
    });

    function loadAddForm(type) {
        content.innerHTML = `<h2>Add ${capitalizeFirstLetter(type)}</h2>`;
        content.innerHTML += getFormHTML(type);
        setupFormSubmission(type);
    }

    function loadManageView(type) {
        content.innerHTML = `<h2>Manage ${capitalizeFirstLetter(type)}</h2>`;
        fetchAndDisplayData(type);
    }

    function getFormHTML(type, item = null) {
        switch (type) {
            case 'developer':
                return `
                    <form id="developer-form">
                        <label for="name">Developer Name:</label>
                        <input type="text" id="name" name="name" value="${item ? item.name : ''}" required>
                        
                        <label for="address">Address:</label>
                        <input type="text" id="address" name="address" value="${item ? item.address : ''}" required>
                        
                        <label for="incorporationDate">Incorporation Date:</label>
                        <input type="date" id="incorporationDate" name="incorporationDate" value="${item ? item.incorporationDate : ''}" required>
                        
                        <label for="totalProjectsDelivered">Total Projects Delivered:</label>
                        <input type="number" id="totalProjectsDelivered" name="totalProjectsDelivered" value="${item ? item.totalProjectsDelivered : ''}" required>
                        
                        <label for="totalSqFtDelivered">Total Sq Ft Delivered:</label>
                        <input type="number" id="totalSqFtDelivered" name="totalSqFtDelivered" value="${item ? item.totalSqFtDelivered : ''}" required>
                        
                        <label for="reasonForChoosing">Reason for Choosing Developer:</label>
                        <textarea id="reasonForChoosing" name="reasonForChoosing" required>${item ? item.reasonForChoosing : ''}</textarea>
                        
                        <label for="websiteLink">Website Link:</label>
                        <input type="url" id="websiteLink" name="websiteLink" value="${item ? item.websiteLink : ''}" required>
                        
                        <label for="status">Status:</label>
                        <select id="status" name="status" required>
                            <option value="Active" ${item && item.status === 'Active' ? 'selected' : ''}>Active</option>
                            <option value="Inactive" ${item && item.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                        
                        <button type="submit">${item ? 'Update' : 'Submit'}</button>
                    </form>
                `;
            case 'project':
                return `
                    <form id="project-form">
                        <label for="name">Project Name:</label>
                        <input type="text" id="name" name="name" required>
                        
                        <label for="reraStatus">RERA Status:</label>
                        <select id="reraStatus" name="reraStatus" required>
                            <option value="Approved">Approved</option>
                            <option value="Not Approved">Not Approved</option>
                        </select>
                        
                        <label for="reraNumber">Project RERA Number:</label>
                        <input type="text" id="reraNumber" name="reraNumber">
                        
                        <label for="startingPrice">Starting Price:</label>
                        <input type="number" id="startingPrice" name="startingPrice" required>
                        
                        <label for="media">Media:</label>
                        <input type="file" id="media" name="media" multiple>
                        
                        <label for="status">Status:</label>
                        <select id="status" name="status" required>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        
                        <button type="submit">Submit</button>
                    </form>
                `;
            case 'tower':
                return `
                    <form id="tower-form">
                        <label for="projectId">Choose Project:</label>
                        <select id="projectId" name="projectId" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                        
                        <label for="developerId">Choose Developer:</label>
                        <select id="developerId" name="developerId" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                        
                        <label for="towerNumber">Tower #:</label>
                        <input type="number" id="towerNumber" name="towerNumber" required>
                        
                        <label for="towerName">Tower Name:</label>
                        <input type="text" id="towerName" name="towerName" required>
                        
                        <label for="towerPhase">Tower Phase:</label>
                        <input type="text" id="towerPhase" name="towerPhase">
                        
                        <label for="developerPhase">Developer Phase:</label>
                        <input type="text" id="developerPhase" name="developerPhase">
                        
                        <label for="phaseReraNumber">Phase RERA #:</label>
                        <input type="text" id="phaseReraNumber" name="phaseReraNumber">
                        
                        <label for="deliveryTimeline">Delivery Timeline:</label>
                        <input type="date" id="deliveryTimeline" name="deliveryTimeline" required>
                        
                        <label for="currentStatus">Current Status:</label>
                        <textarea id="currentStatus" name="currentStatus" required></textarea>
                        
                        <label for="isDuplicate">Duplicate Tower:</label>
                        <input type="checkbox" id="isDuplicate" name="isDuplicate">
                        
                        <label for="totalFloors">Total Floors:</label>
                        <input type="number" id="totalFloors" name="totalFloors" required>
                        
                        <label for="towerCore">Tower Core:</label>
                        <input type="number" id="towerCore" name="towerCore" required>
                        
                        <label for="totalApartments">Total Apartments:</label>
                        <input type="number" id="totalApartments" name="totalApartments" required>
                        
                        <label for="basementParkingLevels">Basement Parking Levels:</label>
                        <input type="number" id="basementParkingLevels" name="basementParkingLevels" required>
                        
                        <label for="hasStiltParking">Stilt Parking:</label>
                        <input type="checkbox" id="hasStiltParking" name="hasStiltParking">
                        
                        <label for="lobby">Lobby:</label>
                        <input type="text" id="lobby" name="lobby">
                        
                        <label for="hasTerrace">Terrace:</label>
                        <input type="checkbox" id="hasTerrace" name="hasTerrace">
                        
                        <label for="refugeArea">Refuge Area:</label>
                        <input type="text" id="refugeArea" name="refugeArea">
                        
                        <label for="exitStairs">Exit/Fire Stairs:</label>
                        <input type="number" id="exitStairs" name="exitStairs" required>
                        
                        <label for="lifts">Lifts:</label>
                        <input type="number" id="lifts" name="lifts" required>
                        
                        <button type="submit">Submit</button>
                    </form>
                `;
            case 'series':
                return `
                    <form id="series-form">
                        <label for="towerId">Choose Tower:</label>
                        <select id="towerId" name="towerId" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                        
                        <label for="seriesName">Series Name:</label>
                        <input type="text" id="seriesName" name="seriesName" required>
                        
                        <label for="isDuplicate">Duplicate Series:</label>
                        <input type="checkbox" id="isDuplicate" name="isDuplicate">
                        
                        <label for="typology">Typology:</label>
                        <select id="typology" name="typology" required>
                            <option value="1BHK">1BHK</option>
                            <option value="2BHK">2BHK</option>
                            <option value="3BHK">3BHK</option>
                            <option value="4BHK">4BHK</option>
                        </select>
                        
                        <label for="bhkType">BHK Type:</label>
                        <input type="text" id="bhkType" name="bhkType" required>
                        
                        <label for="addOns">Add-Ons:</label>
                        <div id="addOns">
                            <input type="checkbox" id="utility" name="addOns" value="Utility">
                            <label for="utility">Utility</label>
                            <input type="checkbox" id="terrace" name="addOns" value="Terrace">
                            <label for="terrace">Terrace</label>
                            <input type="checkbox" id="store" name="addOns" value="Store">
                            <label for="store">Store</label>
                        </div>
                        
                        <label for="bedrooms">Bedrooms:</label>
                        <input type="number" id="bedrooms" name="bedrooms" required>
                        
                        <label for="livingDining">Living/Dining:</label>
                        <input type="text" id="livingDining" name="livingDining" required>
                        
                        <label for="bathrooms">Bathrooms:</label>
                        <input type="number" id="bathrooms" name="bathrooms" required>
                        
                        <label for="balconies">Balconies:</label>
                        <input type="number" id="balconies" name="balconies" required>
                        
                        <label for="seriesExitDirection">Series Exit Direction:</label>
                        <select id="seriesExitDirection" name="seriesExitDirection" required>
                            <option value="N">North</option>
                            <option value="E">East</option>
                            <option value="W">West</option>
                            <option value="S">South</option>
                        </select>
                        
                        <label for="unitCarpetArea">Unit Carpet Area (sq. ft.):</label>
                        <input type="number" id="unitCarpetArea" name="unitCarpetArea" required>
                        
                        <button type="submit">Submit</button>
                    </form>
                `;
            default:
                return '<p>Invalid form type</p>';
        }
    }

    function setupFormSubmission(type, id = null) {
        const form = document.querySelector(`#${type}-form`);
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            const url = id 
                ? `https://acredge-projet-backend.onrender.com/api/${type}s/${id}`
                : `https://acredge-projet-backend.onrender.com/api/${type}s`;
            const method = id ? 'PUT' : 'POST';
            
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                
                if (response.ok) {
                    alert(`${capitalizeFirstLetter(type)} ${id ? 'updated' : 'added'} successfully!`);
                    loadManageView(type);
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            }
        });
    }

    async function fetchAndDisplayData(type) {
        try {
            const response = await fetch(`https://acredge-projet-backend.onrender.com/api/${type}s`);
            const data = await response.json();
            
            let html = `<table>
                <thead>
                    <tr>
                        ${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>`;
            
            data.forEach(item => {
                html += `<tr>
                    ${Object.values(item).map(value => `<td>${value}</td>`).join('')}
                    <td>
                        <button onclick="editItem('${type}', '${item.id}')">Edit</button>
                        <button onclick="deleteItem('${type}', '${item.id}')">Delete</button>
                    </td>
                </tr>`;
            });
            
            html += `</tbody></table>`;
            content.innerHTML += html;
        } catch (error) {
            console.error('Error:', error);
            content.innerHTML += '<p>Error fetching data. Please try again later.</p>';
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // These functions would be implemented to handle editing and deleting items
    window.editItem = async (type, id) => {
        try {
            const response = await fetch(`https://acredge-projet-backend.onrender.com/api/${type}s/${id}`);
            if (response.ok) {
                const item = await response.json();
                content.innerHTML = `<h2>Edit ${capitalizeFirstLetter(type)}</h2>`;
                content.innerHTML += getFormHTML(type, item);
                setupFormSubmission(type, id);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching the item data.');
        }
    };

    window.deleteItem = async (type, id) => {
        if (confirm(`Are you sure you want to delete this ${type}?`)) {
            try {
                const response = await fetch(`https://acredge-projet-backend.onrender.com/api/${type}s/${id}`, {
                    method: 'DELETE',
                });
                
                if (response.ok) {
                    alert(`${capitalizeFirstLetter(type)} deleted successfully!`);
                    loadManageView(type);
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the item.');
            }
        }
    };
});