package com.bugtracker.service;

import com.bugtracker.model.Bug;
import com.bugtracker.repository.BugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class BugService {
    
    @Autowired
    private BugRepository bugRepository;
    
    // Get all bugs
    public List<Bug> getAllBugs() {
        return bugRepository.findAllByOrderByCreatedAtDesc();
    }
    
    // Get bug by ID
    public Optional<Bug> getBugById(Long id) {
        return bugRepository.findById(id);
    }
    
    // Create new bug
    public Bug createBug(Bug bug) {
        // Set default status if not provided
        if (bug.getStatus() == null || bug.getStatus().trim().isEmpty()) {
            bug.setStatus("Open");
        }
        return bugRepository.save(bug);
    }
    
    // Update existing bug
    public Bug updateBug(Long id, Bug updatedBug) {
        Optional<Bug> existingBugOpt = bugRepository.findById(id);
        if (existingBugOpt.isPresent()) {
            Bug existingBug = existingBugOpt.get();
            
            // Update fields
            existingBug.setTitle(updatedBug.getTitle());
            existingBug.setDescription(updatedBug.getDescription());
            existingBug.setAssignedTo(updatedBug.getAssignedTo());
            existingBug.setStatus(updatedBug.getStatus());
            
            return bugRepository.save(existingBug);
        }
        return null;
    }
    
    // Update bug status only
    public Bug updateBugStatus(Long id, String status) {
        Optional<Bug> bugOpt = bugRepository.findById(id);
        if (bugOpt.isPresent()) {
            Bug bug = bugOpt.get();
            bug.setStatus(status);
            return bugRepository.save(bug);
        }
        return null;
    }
    
    // Delete bug
    public boolean deleteBug(Long id) {
        if (bugRepository.existsById(id)) {
            bugRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Search bugs
    public List<Bug> searchBugs(String searchTerm) {
        return bugRepository.searchBugs(searchTerm);
    }
    
    // Get bugs by status
    public List<Bug> getBugsByStatus(String status) {
        return bugRepository.findByStatusOrderByCreatedAtDesc(status);
    }
    
    // Get bugs by assigned person
    public List<Bug> getBugsByAssignedTo(String assignedTo) {
        return bugRepository.findByAssignedToOrderByCreatedAtDesc(assignedTo);
    }
    
    // Get bug statistics
    public Map<String, Object> getBugStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        // Get total count
        long totalBugs = bugRepository.count();
        stats.put("total", totalBugs);
        
        // Get status breakdown
        List<Object[]> statusCounts = bugRepository.countBugsByStatus();
        Map<String, Long> statusBreakdown = new HashMap<>();
        
        for (Object[] row : statusCounts) {
            String status = (String) row[0];
            Long count = (Long) row[1];
            statusBreakdown.put(status, count);
        }
        stats.put("statusBreakdown", statusBreakdown);
        
        // Get recent bugs count (last 7 days)
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        Long recentCount = bugRepository.countRecentBugs(weekAgo);
        stats.put("recentBugs", recentCount);
        
        return stats;
    }
    
    // Initialize sample data
    public void initializeSampleData() {
        if (bugRepository.count() == 0) {
            String[][] sampleBugs = {
                {"NullPointer Exception", "Occurs while accessing an uninitialized object in user service", "John Doe"},
                {"ArrayIndexOutOfBounds", "Accessing array index beyond range in data processing module", "Jane Smith"},
                {"UI Freeze", "Login button unresponsive on click after form validation", "Mike Johnson"},
                {"SQL Injection", "User login form vulnerable to SQL injection attacks", "Sarah Wilson"},
                {"Memory Leak", "Application memory usage keeps increasing during bulk operations", "Tom Brown"}
            };
            
            for (String[] bugData : sampleBugs) {
                Bug bug = new Bug(bugData[0], bugData[1], bugData[2]);
                bugRepository.save(bug);
            }
        }
    }
}