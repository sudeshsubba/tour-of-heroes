import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
    heroes: Hero[] ;
    selectedHero: Hero;

    constructor(private heroService: HeroService) {}

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        console.log(`hero name ${this.selectedHero.name}`);
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => {
                this.heroes = heroes;
                console.log(`heroes fetched`);
            }
        );
    }

    ngOnInit() {
        this.getHeroes();
    }

    addHero(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.addHero({ name } as Hero)
            .subscribe(hero => this.heroes.push(hero));
    }

    deleteHero(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
}

