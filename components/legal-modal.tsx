'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

type DocumentType = 'privacy' | 'terms' | 'lgpd' | null

export function LegalModal() {
  const [openDocument, setOpenDocument] = useState<DocumentType>(null)

  const documents = {
    privacy: {
      title: 'Política de Privacidade',
      content: `
POLÍTICA DE PRIVACIDADE
Virtuax Telecom

Última atualização: 20 de março de 2026

1. INTRODUÇÃO

A Virtuax Telecom ("nós", "nosso" ou "Virtuax") opera o site virtuax.com.br. Esta página informa você sobre nossas políticas em relação à coleta, uso e divulgação de dados pessoais quando você usa nosso Serviço e as escolhas que você tem associadas a esses dados.

2. INFORMAÇÕES COLETADAS

Coletamos informações de diferentes maneiras:

2.1 Informações que você nos fornece:
- Dados de cadastro (nome, e-mail, telefone, endereço)
- Informações de pagamento
- Conteúdo de comunicações com nosso suporte

2.2 Informações coletadas automaticamente:
- Dados de navegação e uso do site
- Endereço IP
- Tipo de navegador
- Cookies e tecnologias similares

3. USO DAS INFORMAÇÕES

Utilizamos as informações coletadas para:
- Fornecer, manter e melhorar nossos serviços
- Processar transações
- Enviar notificações técnicas e atualizações
- Responder a suas dúvidas e solicitações
- Conformidade legal

4. PROTEÇÃO DOS DADOS

Implementamos medidas de segurança apropriadas para proteger seus dados pessoais contra acesso não autorizado, alteração ou destruição.

5. SEUS DIREITOS

De acordo com a LGPD, você tem o direito de:
- Acessar seus dados pessoais
- Corrigir dados inexatos
- Solicitar exclusão de dados
- Revogar consentimento

Para exercer qualquer desses direitos, entre em contato conosco através de sac@virtuax.com.br

6. ALTERAÇÕES NESTA POLÍTICA

Podemos atualizar esta política de tempos em tempos. A data de atualização mais recente está indicada no topo.

7. CONTATO

Se tiver dúvidas sobre esta política, entre em contato:
Email: sac@virtuax.com.br
Telefone: 0800 731 5050
      `
    },
    terms: {
      title: 'Termos de Uso',
      content: `
TERMOS DE USO
Virtuax Telecom

Última atualização: 20 de março de 2026

1. ACEITAÇÃO DOS TERMOS

Ao acessar e usar o site da Virtuax Telecom, você aceita estar vinculado por estes Termos de Uso. Se não concordar com qualquer parte, não use o site.

2. LICENÇA DE USO

Concedemos a você uma licença limitada, não exclusiva e revogável para usar este site apenas para fins pessoais e não comerciais.

3. RESTRIÇÕES

Você concorda em não:
- Modificar ou copiar materiais do site
- Usar conteúdo para propósitos comerciais
- Tentar ganhar acesso não autorizado aos sistemas
- Coletar ou rastrear informações pessoais de outros usuários
- Interferir com o funcionamento do site

4. ISENÇÃO DE RESPONSABILIDADE

O site é fornecido "como está", sem garantias de qualquer tipo. Não garantimos que o site funcionará sem interrupções ou erros.

5. LIMITAÇÃO DE RESPONSABILIDADE

Em nenhuma circunstância a Virtuax será responsável por danos indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de usar o site.

6. LINKS EXTERNOS

O site pode conter links para sites de terceiros. Não somos responsáveis por conteúdo, precisão ou práticas de privacidade desses sites.

7. MODIFICAÇÕES

Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso continuado do site após modificações constitui aceitação dos novos termos.

8. LEI APLICÁVEL

Estes termos são regidos pelas leis da República Federativa do Brasil.

9. CONTATO

Para questões sobre estes termos, entre em contato:
Email: sac@virtuax.com.br
Telefone: 0800 731 5050
      `
    },
    lgpd: {
      title: 'LGPD - Lei Geral de Proteção de Dados',
      content: `
LEI GERAL DE PROTEÇÃO DE DADOS (LGPD)
Virtuax Telecom

Última atualização: 20 de março de 2026

1. CONFORMIDADE COM A LGPD

A Virtuax Telecom está comprometida em cumprir totalmente a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).

2. DIREITOS DO TITULAR DE DADOS

Conforme a LGPD, você tem os seguintes direitos:

2.1 Direito de Acesso
Você pode solicitar acesso a todos os dados pessoais que mantemos sobre você.

2.2 Direito de Correção
Você pode solicitar a correção de dados pessoais inexatos ou incompletos.

2.3 Direito de Exclusão
Você pode solicitar a exclusão de seus dados pessoais, exceto quando há obrigação legal de retenção.

2.4 Direito de Portabilidade
Você pode solicitar transferência de seus dados pessoais para outro fornecedor de serviços.

2.5 Direito de Oposição
Você pode se opor ao processamento de seus dados pessoais.

2.6 Direito a Não Ser Submetido a Decisão Automatizada
Você tem o direito de não ser submetido a processos automatizados que resultem em decisões significativas.

3. BASE LEGAL PARA PROCESSAMENTO

Processamos seus dados pessoais com base em:
- Consentimento do titular
- Execução de contrato
- Cumprimento de obrigação legal
- Exercício de direitos em processo judicial
- Proteção de crédito
- Interesse legítimo

4. EXERCER SEUS DIREITOS

Para exercer qualquer dos direitos acima, envie uma solicitação para:
Email: sac@virtuax.com.br
Telefone: 0800 731 5050

Sua solicitação deve incluir:
- Identificação clara
- Descrição do direito que deseja exercer
- Documentação de identidade

5. ENCARREGADO DE PROTEÇÃO DE DADOS (DPO)

Designamos um Encarregado de Proteção de Dados para monitorar conformidade:
Email: dpo@virtuax.com.br

6. SEGURANÇA DE DADOS

Implementamos medidas técnicas e organizacionais para proteger seus dados contra:
- Acesso não autorizado
- Alteração indevida
- Destruição acidental ou não autorizada
- Perda

7. INCIDENTES DE SEGURANÇA

Em caso de incidente de segurança, informaremos os afetados conforme exigido pela lei.

8. RETENÇÃO DE DADOS

Mantemos seus dados pessoais apenas enquanto necessário para as finalidades indicadas ou conforme exigido por lei.

9. CONSENTIMENTO

Você pode revogar seu consentimento a qualquer momento, mas isso não afeta a legalidade do processamento anterior.

10. CONTATO

Dúvidas sobre LGPD? Entre em contato:
Email: sac@virtuax.com.br
Telefone: 0800 731 5050
      `
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenDocument('privacy')}
        className="hover:text-brand transition-colors duration-200"
      >
        Política de Privacidade
      </button>

      <button
        onClick={() => setOpenDocument('terms')}
        className="hover:text-brand transition-colors duration-200"
      >
        Termos de Uso
      </button>

      <button
        onClick={() => setOpenDocument('lgpd')}
        className="hover:text-brand transition-colors duration-200"
      >
        LGPD
      </button>

      {openDocument && (
        <Dialog open={true} onOpenChange={() => setOpenDocument(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] bg-gray-900 border border-gray-800 [&>button]:text-brand [&>button]:hover:text-brand [&>button]:hover:bg-brand/10">
            <DialogHeader>
              <DialogTitle className="text-brand text-xl">
                {documents[openDocument].title}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-sans">
                {documents[openDocument].content}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
