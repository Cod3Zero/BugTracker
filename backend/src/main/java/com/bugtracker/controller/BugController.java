package com.bugtracker.controller;

import com.bugtracker.model.Bug;
import com.bugtracker.service.BugService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bugs")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class BugController {
    
    @Autowired
    private BugService bugService;
    
    // Get all bugs
    @GetMapping
    public ResponseEntity<List<Bug>> getAllBugs() {
        List<Bug> bugs = bugService.getAllBugs();
        return ResponseEntity.ok(bugs);
    }
    
    // Get bug by ID
    @GetMapping("/{id}")
    public ResponseEntity<Bug> getBugById(@PathVariable Long id) {
        Optional<Bug> bug = bugService.getBugById(id);
        return bug.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    // Create new bug
    @PostMapping
    public ResponseEntity<Bug> createBug(@Valid @RequestBody Bug bug) {
        try {
            Bug createdBug = bugService.createBug(bug);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBug);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // Update existing bug
    @PutMapping("/{id}")
    public ResponseEntity<Bug> updateBug(@PathVariable Long id, @Valid @RequestBody Bug bug) {
        Bug updatedBug = bugService.updateBug(id, bug);
        if (updatedBug != null) {
            return ResponseEntity.ok(updatedBug);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Update bug status only
    @PatchMapping("/{id}/status")
    public ResponseEntity<Bug> updateBugStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        if (status == null || status.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        Bug updatedBug = bugService.updateBugStatus(id, status);
        if (updatedBug != null) {
            return ResponseEntity.ok(updatedBug);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete bug
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBug(@PathVariable Long id) {
        boolean deleted = bugService.deleteBug(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Search bugs
    @GetMapping("/search")
    public ResponseEntity<List<Bug>> searchBugs(@RequestParam String q) {
        List<Bug> bugs = bugService.searchBugs(q);
        return ResponseEntity.ok(bugs);
    }
    
    // Get bugs by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Bug>> getBugsByStatus(@PathVariable String status) {
        List<Bug> bugs = bugService.getBugsByStatus(status);
        return ResponseEntity.ok(bugs);
    }
    
    // Get bugs by assigned person
    @GetMapping("/assigned/{assignedTo}")
    public ResponseEntity<List<Bug>> getBugsByAssignedTo(@PathVariable String assignedTo) {
        List<Bug> bugs = bugService.getBugsByAssignedTo(assignedTo);
        return ResponseEntity.ok(bugs);
    }
    
    // Get bug statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getBugStatistics() {
        Map<String, Object> stats = bugService.getBugStatistics();
        return ResponseEntity.ok(stats);
    }
    
    // Initialize sample data (for testing)
    @PostMapping("/init-sample-data")
    public ResponseEntity<String> initializeSampleData() {
        bugService.initializeSampleData();
        return ResponseEntity.ok("Sample data initialized successfully");
    }
}
