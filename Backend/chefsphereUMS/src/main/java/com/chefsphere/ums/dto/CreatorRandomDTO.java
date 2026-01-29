package com.chefsphere.ums.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class CreatorRandomDTO {
    private Long cid;
    private Long uid;
    private String username;
    private String pic;
}
