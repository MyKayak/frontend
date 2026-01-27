import React from 'react'
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <h1>Ricerca</h1>
            <h2>Come funziona la ricerca?</h2>
            <p>s</p>
            <h2>Come mai bisogna aspettare così a lungo?</h2>
            <p>
                In questo momento quando viene aperta una gara e vengono scelti dei filtri,
                il vostro client (che sia un telefono, tablet o portatile) scarica ed elabora i dati di tutte le batterie da solo.
                Questo richiede molto tempo, soprattutto se la connessione è scarsa. <br></br>
                Stiamo lavorando su una soluzione più performante, in questo momento vengono in mente due strade:
                <ul className="">
                    <li>Scaricare ed elaborare i dati sul server (che ha la gigabit e quindi riesce a scaricare i dati molto più veloce di un telefono in campo gara) in modo che si possa risparmiare tempo.</li>
                    <li>Tenere il sistema di adesso ma trovando un modo di mostrare le gare man mano che vengono filtrate.</li>
                </ul>
                Il progetto è open source su <Link href="https://github.com/mykayak.frontend" className="link">GitHub</Link>, siete liberi di contribuire :3
            </p>
        </div>
    )
}
export default Page
