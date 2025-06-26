package com.bugtracker.repository;

import com.bugtracker.model.Bug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {
    
    // Find bugs by status
    List<Bug> findByStatusOrderByCreatedAtDesc(String status);
    
    // Find bugs by assigned person
    List<Bug> findByAssignedToOrderByCreatedAtDesc(String assignedTo);
    
    // Search bugs by title or description (case-insensitive)
    @Query("SELECT b FROM Bug b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(b.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Bug> searchBugs(@Param("searchTerm") String searchTerm);
    
    // Get bugs created within a specific time period
    List<Bug> findByCreatedAtAfterOrderByCreatedAtDesc(LocalDateTime date);
    
    // Count bugs by status
    @Query("SELECT b.status, COUNT(b) FROM Bug b GROUP BY b.status")
    List<Object[]> countBugsByStatus();
    
    // Get recent bugs (last 7 days)
    @Query("SELECT COUNT(b) FROM Bug b WHERE b.createdAt >= :date")
    Long countRecentBugs(@Param("date") LocalDateTime date);
    
    // Get all bugs ordered by creation date (most recent first)
    List<Bug> findAllByOrderByCreatedAtDesc();
    
    // Custom query to get bug statistics
    @Query(value = "SELECT " +
           "COUNT(*) as total, " +
           "SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open, " +
           "SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as inProgress, " +
           "SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved, " +
           "SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) as closed " +
           "FROM bugs", nativeQuery = true)
    Map<String, Object> getBugStatistics();
}