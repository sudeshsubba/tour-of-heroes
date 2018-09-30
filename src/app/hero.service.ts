import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders ({ 'Content_Type': 'application/json' })
};


@Injectable({
    providedIn: 'root',
})


export class HeroService {
    private heroesUrl = 'api/heroes';

    constructor(private http: HttpClient, private messageService: MessageService) {}

    getHeroes(): Observable< Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap (heroes => this.log(`Fetched heroes ${heroes.length}`)),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap (_ => this.log(`Fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id= ${id}`))
        );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => this.log(`Updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('Update Hero'))
        );
    }

    addHero (hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((hero: Hero) => this.log(`added hero w/t id = ${hero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

    deleteHero(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http.delete<Hero>(url, httpOptions).pipe(
            tap(_ => this.log(`Deleted hero id ${hero.id}`)),
            catchError(this.handleError<Hero>('Delete Hero'))
        );
    }

    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([]);
        }

        const url = `${this.heroesUrl}/?name=${term}`;

        return this.http.get<Hero[]>(url).pipe(
            tap(_ => this.log(`Found heroes matching ${term}`)),
            catchError(this.handleError<Hero[]>('Search Heroes', []))
        );
    }

    private log(message: string) {
        this.messageService.add(`Hero Service: ${message}`);
    }

    handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
}
