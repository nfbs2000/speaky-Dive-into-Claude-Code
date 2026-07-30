# 7장: 서브에이전트와 격리

서브에이전트는 같은 대화에 역할 이름을 하나 더 붙이는 기능이 아니다. 새
컨텍스트, 도구 집합, permission mode와 transcript를 가진 격리된 실행이다.

## 격리의 이유

하위 실행의 모든 대화를 부모에게 복사하면 부모 컨텍스트가 빠르게 소진된다.
Claude Code는 서브에이전트의 전체 기록을 sidechain JSONL에 보존하고, 부모에게는
요약만 돌려준다. 자세한 원본은 사라지지 않지만 부모의 현재 작업창에는 들어오지
않는다.

## 세 가지 실행 경계

| 방식 | 격리 |
| --- | --- |
| in-process | 대화 컨텍스트는 분리하지만 파일시스템은 공유 |
| worktree | 대화와 쓰기 작업공간을 함께 분리 |
| remote | 실행 환경까지 원격으로 분리 |

격리는 강할수록 비용이 커진다. 모든 작은 작업을 서브에이전트로 보내는 것은
정답이 아니다. 독립적인 조사, 검증이나 장시간 작업처럼 경계가 실제 이익을 줄 때
사용해야 한다.

## 권한의 상속과 escalation

하위 실행은 자신의 permission mode를 가질 수 있지만, 사용자가 부모 세션에서
명시적으로 선택한 강한 모드가 우선될 수 있다. 반대로 하위 실행이 사용자에게
직접 질문하지 못하는 환경에서는 상위 조정자에게 권한 요청과 질문을 올려야 한다.

이때 중요한 것은 조정자가 결과를 대신 만들어 주는 것이 아니다. 하위 실행의
요청을 원문 의미를 잃지 않고 부모와 사용자에게 전달하는 것이다.

![서브에이전트 구조][subagent]

## 원문으로 돌아가기

- [README: Subagent Delegation][readme]
- [Architecture: Subagent Delegation][architecture]

[readme]: https://github.com/VILA-Lab/Dive-into-Claude-Code/blob/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/README.md
[architecture]: https://github.com/VILA-Lab/Dive-into-Claude-Code/blob/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/docs/architecture.md
[subagent]: https://raw.githubusercontent.com/VILA-Lab/Dive-into-Claude-Code/ab04bc85e4920ceef2a8a47c069524d3bc9fec22/assets/subagent.png
