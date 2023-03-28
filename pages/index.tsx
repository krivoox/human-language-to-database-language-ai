import React from 'react'
import { Container, Textarea, Card, Text, Button, Grid, Spacer } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import api from '@/querys/client'

export default function Home() {
  const { register, handleSubmit: submit } = useForm()
  const [queryAi, setQueryAi] = React.useState<string | undefined>()


  const _handleSubmit = (prompt: any) => {
    console.log(prompt)
    api.generate(prompt)
      .then((res) => {
        setQueryAi(res)
      })
      .catch((err) => {
        console.log("🚀 ~ file: index.tsx:15 ~ .then ~ err:", err)
      })
  }

  return (
    <div style={{
      background: "linear-gradient(to bottom, transparent, rgb(255, 255, 255)), rgb(214, 219, 220)",
      height: "100vh",
    }}>
      <Container>
        <Text h1 css={{ textAlign: 'center' }}>MongoDB Query Translator</Text>
        <Text css={{ textAlign: 'center', fontSize: 22 }}>Human Language to query Translator</Text>
        <Spacer y={4} />


        <form onSubmit={submit(_handleSubmit)}>
          <Grid.Container justify="center">
            <Grid xs={12} sm={5}>

              <Card css={{ w: '100%', m: 10 }}>
                <Card.Body>
                  <Textarea
                    label="Write what you need from your DB"
                    placeholder="Search for all gray cats under 2 years old."
                    rows={10}
                    {...register('humanLanguageValue', { required: 'you must enter a request' })}
                  />

                </Card.Body>
              </Card>

            </Grid>
            <Grid xs={12} sm={2}>

              <Button
                shadow
                color="gradient"
                auto
                css={{ alignSelf: 'center', mr: 'auto', ml: 'auto' }}
                type='submit'
              >
                Translate
              </Button>

            </Grid>
            <Grid xs={12} sm={5}>

              <Card css={{ w: '100%', m: 10 }}>
                <Card.Body>
                  <Textarea
                    label="Use the query to consult your database"
                    placeholder="db.cats.find({color: 'gray', age: {$lt: 2}})"
                    rows={10}
                    value={queryAi}
                  />
                </Card.Body>
              </Card>

            </Grid>
          </Grid.Container>
        </form>









      </Container>
    </div>
  )
}
