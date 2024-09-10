describe("마이페이지 쿠키 인증", () => {
  beforeEach(() => {
    // 서버 측 쿠키 설정 API 호출
    cy.request("POST", "http://localhost:3000/api/set-cookie", {
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6InJsYWRic3RuMTIxMkBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTcyNTc4NTkzNiwiZXhwIjoxNzI2MzkwNzM2fQ.XEDL-9_c1P1tr0ap7UHetrlKIuo0BlkkvD3UL9RGvcPvf_ceHNXMOcAe5Qgfz2MvSC5ZMM0ZX291QttDwu7tXQ",
    });
  });

  it("마이페이지 방문", () => {
    // 쿠키가 설정된 상태로 마이페이지 방문
    cy.visit("/mypage");

    // 로그인 후 마이페이지 요소 확인
    cy.get("[data-cy=toggle1]").should("be.visible").as("toggle1");
    cy.get("[data-cy=toggle2]").should("be.visible").as("toggle2");

    cy.get("@toggle2").click();
    cy.get("@toggle1").click();
  });
});
