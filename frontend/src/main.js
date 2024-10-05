document.addEventListener('DOMContentLoaded', () => {
    // Select the content area and the add/manage links
    const content = document.getElementById('content');
    const addLinks = document.querySelectorAll('[id^="add-"]'); // Select all elements whose ID starts with 'add-'
    const manageLinks = document.querySelectorAll('[id^="manage-"]'); // Select all elements whose ID starts with 'manage-'

    // Add click event listeners to all add links
    addLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor click behavior
            const type = e.target.id.split('-')[1]; // Get the type from the ID
            loadAddForm(type); // Load the corresponding add form
        });
    });

    // Add click event listeners to all manage links
    manageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor click behavior
            const type = e.target.id.split('-')[1]; // Get the type from the ID
            loadManageView(type); // Load the management view for the type
        });
    });

    // Function to load the add form based on the type
    function loadAddForm(type) {
        content.innerHTML = `<h2>Add ${capitalizeFirstLetter(type)}</h2>`; // Set the header for the add form
        content.innerHTML += getFormHTML(type); // Generate and add the form HTML to the content
        setupFormSubmission(type); // Set up the form submission handler
    }

    // Function to load the management view based on the type
    function loadManageView(type) {
        content.innerHTML = `<h2>Manage ${capitalizeFirstLetter(type)}</h2>`; // Set the header for the management view
        fetchAndDisplayData(type); // Fetch and display the data for the type
    }

    // Function to generate the HTML for the form based on the type
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
                        
                        <button type="submit">Submit</button>
                    </form>
                `;
            default:
                return '';
        }
    }

    // Function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Function to set up form submission handling
    function setupFormSubmission(type) {
        const form = document.getElementById(`${type}-form`);
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission
            const formData = new FormData(form); // Create a FormData object from the form

            // Perform an AJAX request to save the data
            fetch(`/api/${type}`, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message); // Alert the user with the response message
                loadManageView(type); // Reload the management view
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Function to fetch and display data based on the type
    function fetchAndDisplayData(type) {
        fetch(`/api/${type}`)
            .then(response => response.json())
            .then(data => {
                displayData(data, type); // Display the fetched data
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Function to display the fetched data in a table format
    function displayData(data, type) {
        const table = document.createElement('table'); // Create a new table element
        const headerRow = document.createElement('tr'); // Create a header row

        // Define headers based on the type
        let headers = [];
        switch (type) {
            case 'developer':
                headers = ['Name', 'Address', 'Incorporation Date', 'Total Projects Delivered', 'Total Sq Ft Delivered', 'Reason for Choosing', 'Website Link', 'Status', 'Actions'];
                break;
            case 'project':
                headers = ['Project Name', 'RERA Status', 'RERA Number', 'Starting Price', 'Media', 'Status', 'Actions'];
                break;
            case 'tower':
                headers = ['Project', 'Developer', 'Tower #', 'Tower Name', 'Tower Phase', 'Delivery Timeline', 'Current Status', 'Actions'];
                break;
            case 'series':
                headers = ['Tower', 'Series Name', 'Actions'];
                break;
            default:
                return;
        }

        // Append headers to the header row and to the table
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow); // Append the header row to the table

        // Populate the table with data
        data.forEach(item => {
            const row = document.createElement('tr'); // Create a new row for each item
            for (let key in item) {
                const td = document.createElement('td'); // Create a new cell
                td.textContent = item[key]; // Set the cell text to the item value
                row.appendChild(td); // Append the cell to the row
            }

            // Create action buttons for each item
            const actionTd = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                loadAddForm(type, item); // Load the add form for editing
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteItem(type, item.id); // Delete the item
            });

            actionTd.appendChild(editButton); // Add the edit button to the actions cell
            actionTd.appendChild(deleteButton); // Add the delete button to the actions cell
            row.appendChild(actionTd); // Append the actions cell to the row

            table.appendChild(row); // Append the row to the table
        });

        content.innerHTML = ''; // Clear the content area
        content.appendChild(table); // Append the populated table to the content area
    }

    // Function to delete an item
    function deleteItem(type, id) {
        fetch(`/api/${type}/${id}`, {
            method: 'DELETE', // Set the method to DELETE
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Alert the user with the response message
            loadManageView(type); // Reload the management view
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
