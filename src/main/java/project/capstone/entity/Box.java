package project.capstone.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Box {

    @Id @GeneratedValue
    @Column(name = "box_id")
    private Long id;

    private String type;
    private String boxcorners;
    private String ansize;

    @Enumerated(EnumType.STRING)
    private BoxDefect defect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    public Box(String type, String boxcorners, String ansize, BoxDefect defect) {
        this.type = type;
        this.boxcorners = boxcorners;
        this.ansize = ansize;
        this.defect = defect;
    }
}
