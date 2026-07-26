package com.rankquest.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "activity_logs", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "date"})
})
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int problemsSolved;

    public ActivityLog(Long userId, LocalDate date, int problemsSolved) {
        this.userId = userId;
        this.date = date;
        this.problemsSolved = problemsSolved;
    }
}
