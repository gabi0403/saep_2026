#!/bin/bash

# Script de Testes - Validar Correções de Conexão BD
# ===================================================

echo "🧪 Iniciando testes de conexão com BD..."
echo ""

API_URL="http://localhost:3000"

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_count=0
passed=0
failed=0

# Função para fazer requisição e validar
test_endpoint() {
  local method=$1
  local endpoint=$2
  local expected_status=$3
  local description=$4
  
  test_count=$((test_count + 1))
  
  echo "Test #$test_count: $description"
  
  response=$(curl -s -o /tmp/response.json -w "%{http_code}" -X $method "$API_URL$endpoint")
  
  if [ "$response" = "$expected_status" ]; then
    echo -e "${GREEN}✅ PASSOU${NC} (Status: $response)"
    passed=$((passed + 1))
  else
    echo -e "${RED}❌ FALHOU${NC} (Esperado: $expected_status, Recebido: $response)"
    failed=$((failed + 1))
  fi
  
  echo ""
}

# Aguarda servidor estar pronto
echo "⏳ Aguardando servidor em http://localhost:3000..."
for i in {1..10}; do
  if curl -s "$API_URL" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Servidor respondendo${NC}"
    break
  fi
  sleep 1
done

echo ""
echo "======================================"
echo "TESTES DE ENDPOINT"
echo "======================================"
echo ""

# Teste 1: Health check
test_endpoint "GET" "/health" "200" "Health check retorna 200"

# Teste 2: Teste BD
test_endpoint "GET" "/teste-db" "200" "Teste BD retorna 200"

# Teste 3: Rota raiz
test_endpoint "GET" "/" "200" "Rota raiz retorna 200"

# Teste 4: Rota 404
test_endpoint "GET" "/rota-inexistente" "404" "Rota inexistente retorna 404"

echo "======================================"
echo "TESTES DE STRESS - Verificar Reconexão"
echo "======================================"
echo ""

echo "🔄 Executando 5 requisições rápidas em sequência..."
for i in {1..5}; do
  echo -n "Requisição $i... "
  status=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$API_URL/teste-db")
  if [ "$status" = "200" ]; then
    echo -e "${GREEN}OK${NC}"
    passed=$((passed + 1))
  else
    echo -e "${RED}FALHOU (Status: $status)${NC}"
    failed=$((failed + 1))
  fi
  sleep 0.5
done

echo ""
echo "======================================"
echo "RESULTADO FINAL"
echo "======================================"
echo -e "${GREEN}✅ Testes Passou: $passed${NC}"
echo -e "${RED}❌ Testes Falharam: $failed${NC}"
echo "Total: $test_count"

if [ $failed -eq 0 ]; then
  echo -e "${GREEN}✨ TODOS OS TESTES PASSARAM!${NC}"
  exit 0
else
  echo -e "${RED}⚠️ ALGUNS TESTES FALHARAM!${NC}"
  exit 1
fi
