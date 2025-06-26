// services/bugService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class BugService {
  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all bugs
  async getAllBugs() {
    return this.request('/bugs');
  }

  // Get bug by ID
  async getBugById(id) {
    return this.request(`/bugs/${id}`);
  }

  // Create a new bug
  async createBug(bugData) {
    return this.request('/bugs', {
      method: 'POST',
      body: JSON.stringify(bugData),
    });
  }

  // Update a bug
  async updateBug(id, bugData) {
    return this.request(`/bugs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bugData),
    });
  }

  // Update bug status only
  async updateBugStatus(id, status) {
    return this.request(`/bugs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Delete a bug
  async deleteBug(id) {
    return this.request(`/bugs/${id}`, {
      method: 'DELETE',
    });
  }

  // Search bugs
  async searchBugs(searchTerm) {
    const encodedTerm = encodeURIComponent(searchTerm);
    return this.request(`/bugs/search?term=${encodedTerm}`);
  }

  // Get bugs by status
  async getBugsByStatus(status) {
    const encodedStatus = encodeURIComponent(status);
    return this.request(`/bugs/status/${encodedStatus}`);
  }

  // Get bug statistics
  async getBugStatistics() {
    return this.request('/bugs/statistics');
  }

  // Get bugs assigned to a specific user
  async getBugsByAssignee(assignee) {
    const encodedAssignee = encodeURIComponent(assignee);
    return this.request(`/bugs/assignee/${encodedAssignee}`);
  }

  // Get recent bugs (last 7 days)
  async getRecentBugs() {
    return this.request('/bugs/recent');
  }

  // Bulk update bugs
  async bulkUpdateBugs(bugIds, updateData) {
    return this.request('/bugs/bulk-update', {
      method: 'PATCH',
      body: JSON.stringify({
        bugIds,
        updateData,
      }),
    });
  }

  // Export bugs to CSV
  async exportBugsToCSV() {
    return this.request('/bugs/export/csv', {
      headers: {
        'Accept': 'text/csv',
      },
    });
  }

  // Get bug count by status
  async getBugCountByStatus() {
    return this.request('/bugs/count-by-status');
  }
}

// Create and export a singleton instance
const bugService = new BugService();
export default bugService;

// Export the class as well for testing purposes
export { BugService };