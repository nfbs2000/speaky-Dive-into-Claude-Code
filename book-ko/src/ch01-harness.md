# 1장: 98.4% 하니스와 1.6% 판단

원 연구의 출발점은 도발적이지만 단순하다.

> Claude Code 코드베이스에서 AI가 결정을 내리는 부분은 약 1.6%이고,
> 나머지 98.4%는 결정론적 인프라다.

이 수치는 “모델은 중요하지 않다”는 뜻이 아니다. 모델의 추론이 실제 제품으로
작동하려면 그 추론을 행동으로 연결하고, 실패했을 때 복구하며, 위험한 행동을
막고, 긴 작업을 이어 가는 시스템이 훨씬 큰 비중을 차지한다는 뜻이다.

## 단순한 루프, 복잡한 주변부

에이전트 루프는 본질적으로 다음과 같은 반복이다.

1. 현재 대화와 환경을 조립한다.
2. 모델을 호출한다.
3. 모델이 요청한 도구를 분류한다.
4. 권한을 확인한 뒤 실행한다.
5. 결과를 대화에 추가한다.
6. 멈출 이유가 없으면 반복한다.

루프만 복제하면 데모는 만들 수 있다. 그러나 프로덕션 제품에는 다음이 필요하다.

- 권한 규칙의 우선순위와 사용자 승인
- 도구별 동시성·격리·결과 크기 제한
- 컨텍스트 압축과 캐시 안정성
- 스트림 중단, 출력 한도와 모델 실패 복구
- 세션 저장, 재개와 하위 에이전트 기록
- 훅, 스킬, 플러그인과 MCP 확장
- CLI, SDK, IDE가 공유하는 실행 경로

원 연구는 이것을 **minimal scaffolding, maximal harness**라고 읽는다. 모델의
판단을 고정 상태 머신으로 과도하게 제한하지 않되, 행동 경계는 결정론적
하니스가 책임진다.

```mermaid
flowchart LR
    G["사용자 목표"] --> L["Agent loop"]
    L --> M["Model 판단"]
    M --> T["Tool 요청"]
    T --> H["Permission·Hook·Sandbox"]
    H --> X["실제 실행"]
    X --> O["관측된 결과"]
    O --> L
```

## 실제 source에서 확인하기

```typescript
const terminal = yield* queryLoop(params, consumedCommandUuids)
for (const uuid of consumedCommandUuids) {
  notifyCommandLifecycle(uuid, 'completed')
}
return terminal
```

[`query()` 실제 구현][actual-query]에서 모델 호출을 둘러싼 loop는
`queryLoop()`에 모이지만, 정상 종료된 command lifecycle을 닫고 `Terminal`을
반환하는 일은 결정론적 코드가 맡는다. “모델이 답했다”와 “실행이 정상
완결됐다”는 다른 사실이다.

## 구축자에게 주는 질문

에이전트를 만들 때 먼저 “어떤 모델을 쓸까”를 묻기 쉽다. 이 연구의 순서는
다르다.

- 실패한 도구 결과가 모델에게 그대로 돌아가는가?
- 사용자가 거절한 권한을 같은 호출로 다시 압박하지 않는가?
- 컨텍스트가 가득 찼을 때 무엇부터 줄이는가?
- 세션을 재개할 때 신뢰와 권한도 복원되는가?
- 서브에이전트의 장황한 기록이 부모 컨텍스트를 오염시키는가?
- 사용자는 시스템이 기억하는 내용을 직접 열어 볼 수 있는가?

이 질문에 답하지 못하면 좋은 모델을 연결해도 신뢰할 수 있는 제품이 되지 않는다.

## 원문으로 돌아가기

- [README: Key Highlights와 Agentic Query Loop][readme]
- [Architecture: Four Design Questions][architecture]

[readme]: https://github.com/VILA-Lab/Dive-into-Claude-Code/blob/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/README.md
[architecture]: https://github.com/VILA-Lab/Dive-into-Claude-Code/blob/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/docs/architecture.md
[actual-query]: https://github.com/codeaashu/claude-code/blob/6a2590911df240ff5ea56aa355696cfb94d128cb/src/query.ts#L219-L238
